'use strict';

const path = require('path');
const fs = require('fs-extra');
const _ = require('lodash');
const { getAbsoluteServerUrl } = require('@strapi/utils');

const { builApiEndpointPath } = require('../utils/builders');
const defaultConfig = require('../config/default-config');

const pathToRegexp = require('path-to-regexp');
const cleanSchemaAttributes = require('../utils/clean-schema-attributes2');
const errorResponse = require('../utils/error-response');

module.exports = ({ strapi }) => {
  const config = strapi.config.get('plugin.documentation');

  return {
    getDocumentationVersion() {
      return _.get(config, 'info.version');
    },

    getFullDocumentationPath() {
      return path.join(strapi.dirs.extensions, 'documentation', 'documentation');
    },

    getDocumentationVersions() {
      return fs
        .readdirSync(this.getFullDocumentationPath())
        .map(version => {
          try {
            const doc = JSON.parse(
              fs.readFileSync(
                path.resolve(this.getFullDocumentationPath(), version, 'full_documentation.json')
              )
            );
            const generatedDate = _.get(doc, ['info', 'x-generation-date'], null);

            return { version, generatedDate, url: '' };
          } catch (err) {
            return null;
          }
        })
        .filter(x => x);
    },

    /**
     * Returns settings stored in core-store
     */
    async getDocumentationAccess() {
      const { restrictedAccess } = await strapi
        .store({
          environment: '',
          type: 'plugin',
          name: 'documentation',
          key: 'config',
        })
        .get();

      return { restrictedAccess };
    },

    /**
     * @description - Gets the path for an api or plugin
     *
     * @param {object} api
     * @property {string} api.name - Name of the api
     * @property {string} api.getter - api | plugin
     *
     * @returns path to the api | plugin
     */
    getApiDocumentationPath(api) {
      if (api.getter === 'plugin') {
        return path.join(strapi.dirs.extensions, api.name, 'documentation');
      }

      return path.join(strapi.dirs.api, api.name, 'documentation');
    },

    async deleteDocumentation(version) {
      const apis = this.getPluginAndApiInfo();
      for (const api of apis) {
        await fs.remove(path.join(this.getApiDocumentationPath(api), version));
      }

      await fs.remove(path.join(this.getFullDocumentationPath(), version));
    },

    getPluginAndApiInfo() {
      const plugins = _.get(config, 'x-strapi-config.plugins');
      const pluginsToDocument = plugins.map(plugin => {
        return {
          name: plugin,
          getter: 'plugin',
          ctNames: Object.keys(strapi.plugin(plugin).contentTypes),
        };
      });

      const apisToDocument = Object.keys(strapi.api).map(api => {
        return {
          name: api,
          getter: 'api',
          ctNames: Object.keys(strapi.api[api].contentTypes),
        };
      });

      return [...apisToDocument, ...pluginsToDocument];
    },

    /**
     * @description - Creates the Swagger json files
     */
    async generateFullDoc(version = this.getDocumentationVersion()) {
      let paths = {};

      const apis = this.getPluginAndApiInfo();
      for (const api of apis) {
        const apiName = api.name;
        const apiDirPath = path.join(this.getApiDocumentationPath(api), version);

        const apiDocPath = path.join(apiDirPath, `${apiName}.json`);
        const apiPathsObject = builApiEndpointPath(api);

        if (!apiPathsObject) {
          continue;
        }

        await fs.ensureFile(apiDocPath);
        await fs.writeJson(apiDocPath, apiPathsObject, { spaces: 2 });

        paths = { ...paths, ...apiPathsObject.paths };
      }

      const fullDocJsonPath = path.join(
        this.getFullDocumentationPath(),
        version,
        'full_documentation.json'
      );

      const settings = _.cloneDeep(defaultConfig);

      const serverUrl = getAbsoluteServerUrl(strapi.config);
      const apiPath = strapi.config.get('api.rest.prefix');

      _.set(settings, 'servers', [
        {
          url: `${serverUrl}${apiPath}`,
          description: 'Development server',
        },
      ]);

      _.set(settings, ['info', 'x-generation-date'], new Date().toISOString());
      _.set(settings, ['info', 'version'], version);

      await fs.ensureFile(fullDocJsonPath);
      await fs.writeJson(fullDocJsonPath, { ...settings, paths }, { spaces: 2 });
    },

    /**
     * @description - Creates the Swagger json files 2
     */
    async generateFullDoc2(version = this.getDocumentationVersion()) {
      let paths = {};
      const schemas = {
        ErrorResponse: errorResponse,
      };
      const responses = {
        ErrorResponse: {
          description: 'Generic error response',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
            },
          },
        },
      };
      const requestParameters = {
        findById: {
          in: 'path',
          name: 'id',
          schema: {
            type: 'integer',
          },
          required: true,
          description: 'id of the element to retrieve',
        },
      };

      for (const api of this.getPluginAndApiInfo()) {
        // An api could have multiple contentTypes
        for (const contentTypeName of api.ctNames) {
          // Get the attributes found on the api's contentType
          const uid = `${api.getter}::${api.name}.${contentTypeName}`;
          const ct = strapi.contentType(uid);
          // component schema name
          const ctn = _.startCase(_.camelCase(contentTypeName)).replace(/ /g, '');

          /**
           * Create the schema for the contentType
           */
          schemas[ctn] = {
            type: 'object',
            properties: cleanSchemaAttributes(ct.attributes),
          };

          schemas[`${ctn}Data`] = {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
              },
              attributes: { $ref: `#/components/schemas/${ctn}` },
            },
          };

          schemas[`${ctn}Response`] = {
            type: 'object',
            properties: {
              data: { $ref: `#/components/schemas/${ctn}Data` },
            },
          };

          schemas[`${ctn}ListResponse`] = {
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: { $ref: `#/components/schemas/${ctn}Data` },
              },
            },
          };

          responses[`${ctn}Response`] = {
            content: {
              'application/json': {
                schema: { $ref: `#/components/schemas/${ctn}Response` },
              },
            },
            description: `A ${ct.info.displayName}`,
          };

          responses[`${ctn}ListResponse`] = {
            content: {
              'application/json': {
                schema: { $ref: `#/components/schemas/${ctn}ListResponse` },
              },
            },
            description: `List of ${ct.info.displayName}`,
          };

          const routeInfo =
            api.getter === 'plugin'
              ? strapi.plugin(api.name).routes['content-api']
              : strapi.api[api.name].routes[contentTypeName];

          if (routeInfo.routes) {
            paths = routeInfo.routes.reduce((_paths, route) => {
              // TODO: Find a more reliable way to determine list of entities vs a single entity
              const isListOfEntities = route.handler.split('.').pop() === 'find';

              const methodVerb = route.method.toLowerCase();
              // building path object
              const path = {
                responses: {
                  200: {
                    $ref: `#/components/responses/${ctn}${isListOfEntities ? 'List' : ''}Response`,
                  },
                  400: {
                    $ref: '#/components/responses/ErrorResponse',
                  },
                  401: {
                    $ref: '#/components/responses/ErrorResponse',
                  },
                  403: {
                    $ref: '#/components/responses/ErrorResponse',
                  },
                  404: {
                    $ref: '#/components/responses/ErrorResponse',
                  },
                  500: {
                    $ref: '#/components/responses/ErrorResponse',
                  },
                },
                'x-tag': [_.upperFirst(api.name)],
                parameters: [],
              };

              // handling path parameters
              if (route.path.includes('/:')) {
                _.set(
                  path,
                  'parameters',
                  pathToRegexp
                    .parse(route.path)
                    .filter(token => _.isObject(token))
                    .map(param => {
                      // if (param.name === "id") {
                      //   return {
                      //     $ref: "#/components/parameters/findById",
                      //   };
                      // }
                      return {
                        name: param.name,
                        in: 'path',
                        description: '',
                        deprecated: false,
                        required: true,
                        schema: { type: 'string' },
                      };
                    })
                );
                route.path = pathToRegexp
                  .parse(route.path)
                  .map(token => {
                    if (_.isObject(token)) {
                      return token.prefix + '{' + token.name + '}';
                    }

                    return token;
                  })
                  .join('');
              }

              // TODO: not great, not familiar enough with the api to detect the presence of body parameters...
              // post and put request body setup
              switch (methodVerb.toLowerCase()) {
                case 'post':
                case 'put':
                  path.requestBody = {
                    description: `${ct.info.displayName} to create`,
                    required: true,
                    content: {
                      'application/json': {
                        schema: {
                          $ref: `#/components/schemas/${ctn}`,
                        },
                      },
                    },
                  };
                  break;
              }

              _.set(_paths, `${route.path}.${methodVerb}`, path);
              return _paths;
            }, paths);
          }
        }
      }

      // fixing user and role paths ....
      paths['/users/{id}'].get.parameters.push({
        in: 'path',
        name: 'id',
        schema: {
          type: 'integer',
        },
        required: true,
        description: 'id of the element to retrieve',
      });
      paths['/users/{id}'].put.parameters.push({
        in: 'path',
        name: 'id',
        schema: {
          type: 'integer',
        },
        required: true,
        description: 'id of the element to retrieve',
      });
      paths['/users/{id}'].delete.parameters.push({
        in: 'path',
        name: 'id',
        schema: {
          type: 'integer',
        },
        required: true,
        description: 'id of the element to retrieve',
      });
      paths['/roles/{id}'].get.parameters.push({
        in: 'path',
        name: 'id',
        schema: {
          type: 'integer',
        },
        required: true,
        description: 'id of the element to retrieve',
      });
      paths['/roles/{role}'].put.parameters.push({
        in: 'path',
        name: 'role',
        schema: {
          type: 'string',
        },
        required: true,
        description: 'id of the element to retrieve',
      });
      paths['/roles/{role}'].delete.parameters.push({
        in: 'path',
        name: 'role',
        schema: {
          type: 'string',
        },
        required: true,
        description: 'id of the element to retrieve',
      });
      paths['/auth/{provider}/callback'].get.parameters.push({
        in: 'path',
        name: 'provider',
        schema: {
          type: 'string',
        },
        required: true,
        description: 'id of the element to retrieve',
      });
      delete paths['/connect/('];

      const settings = _.cloneDeep(defaultConfig);

      const serverUrl = getAbsoluteServerUrl(strapi.config);
      const apiPath = strapi.config.get('api.rest.prefix');

      _.set(settings, 'servers', [
        {
          url: `${serverUrl}${apiPath}`,
          description: 'Development server',
        },
      ]);

      _.set(settings, ['info', 'x-generation-date'], new Date().toISOString());
      _.set(settings, ['info', 'version'], version);
      // pre built components
      _.set(settings, ['components', 'schemas'], schemas);
      _.set(settings, ['components', 'responses'], responses);
      _.set(settings, ['components', 'parameters'], requestParameters);

      const fullDocJsonPath = path.join(
        this.getFullDocumentationPath(),
        version,
        'full_documentation_2.json'
      );
      await fs.ensureFile(fullDocJsonPath);
      await fs.writeJson(
        fullDocJsonPath,
        {
          ...settings,
          paths,
        },
        { spaces: 2 }
      );
    },
  };
};
