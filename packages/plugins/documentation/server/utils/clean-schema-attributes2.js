"use strict";

const _ = require("lodash");
const getSchemaData = require("./get-schema-data");

/**
 * @description - Converts types found on attributes to OpenAPI specific data types
 *
 * @param {object} attributes - The attributes found on a contentType
 * @param {{ typeMap: Map, isRequest: boolean }} opts
 * @returns Attributes using OpenAPI acceptable data types
 */
const cleanAttribute = (attribute) => {
  switch (attribute.type) {
    case "password": {
      return {
        type: "string",
        format: "password",
        example: "*******",
      };
      break;
    }
    case "email": {
      return { type: "string", format: "email" };
      break;
    }
    case "string":
    case "text":
    case "richtext": {
      return { type: "string" };
      break;
    }
    case "timestamp": {
      return {
        type: "string",
        format: "timestamp",
        example: Date.now(),
      };
      break;
    }
    case "time": {
      return {
        type: "string",
        format: "time",
        example: "12:54.000",
      };
      break;
    }
    case "date": {
      return { type: "string", format: "date" };
      break;
    }
    case "datetime": {
      return { type: "string", format: "date-time" };
      break;
    }
    case "boolean": {
      return { type: "boolean" };
      break;
    }
    case "enumeration": {
      return { type: "string", enum: attribute.enum };
      break;
    }
    case "decimal":
    case "float": {
      return { type: "number", format: "float" };
      break;
    }
    case "integer": {
      return { type: "integer" };
      break;
    }
    case "biginteger": {
      return {
        type: "string",
        pattern: "^\\d*$",
        example: "123456789",
      };
      break;
    }
    case "json": {
      return { type: "object" };
      break;
    }
    case "uid": {
      return { type: "string" };
      break;
    }
    case "component": {
      const componentAttributes =
        strapi.components[attribute.component].attributes;

      if (attribute.repeatable) {
        return {
          type: "array",
          items: {
            type: "object",
            properties: {
              ...(isRequest ? {} : { id: { type: "string" } }),
              ...cleanSchemaAttributes(componentAttributes, {
                typeMap,
                isRequest,
              }),
            },
          },
        };
      } else {
        return {
          type: "object",
          properties: {
            ...(isRequest ? {} : { id: { type: "string" } }),
            ...cleanSchemaAttributes(componentAttributes, {
              typeMap,
              isRequest,
            }),
          },
        };
      }
      break;
    }
    case "dynamiczone": {
      const components = attribute.components.map((component) => {
        const componentAttributes = strapi.components[component].attributes;
        return {
          type: "object",
          properties: {
            ...(isRequest ? {} : { id: { type: "string" } }),
            __component: { type: "string" },
            ...cleanSchemaAttributes(componentAttributes, {
              typeMap,
              isRequest,
            }),
          },
        };
      });

      return {
        type: "array",
        items: {
          anyOf: components,
        },
      };
      break;
    }
    case "media": {
      const imageAttributes = strapi.contentType(
        "plugin::upload.file"
      ).attributes;
      const isListOfEntities = attribute.multiple;

      if (isRequest) {
        const oneOfType = {
          oneOf: [{ type: "integer" }, { type: "string" }],
          example: "string or id",
        };

        return isListOfEntities
          ? { type: "array", items: oneOfType }
          : oneOfType;
        break;
      }

      return {
        type: "object",
        properties: {
          data: getSchemaData(
            isListOfEntities,
            cleanSchemaAttributes(imageAttributes)
          ),
        },
      };
      break;
    }

    case "relation": {
      if (
        !attribute.target ||
        attribute.target === "" ||
        attribute.target === "admin::user"
      ) {
        return {
          type: "string",
        };
      }

      const isListOfEntities = attribute.relation.includes("ToMany");

      const targetRef = `#/components/schemas/${_.startCase(
        _.camelCase(
          attribute.target.split(".")[1]
            ? attribute.target.split(".")[1]
            : attribute.target
        )
      ).replace(/ /g, "")}`;

      if (isListOfEntities) {
        return {
          type: "array",
          items: { $ref: targetRef },
        };
      } else {
        return {
          type: "object",
          $ref: targetRef,
        };
      }

      break;
    }
    default: {
      throw new Error(
        `Invalid type ${attribute.type} while generating open api schema.`
      );
    }
  }
};

const cleanSchemaAttributes = (
  attributes,
  { typeMap = new Map(), isRequest = false } = {}
) => {
  const attributesCopy = _.cloneDeep(attributes);

  for (const prop in attributesCopy) {
    const attribute = attributesCopy[prop];
    if (attribute.default) {
      delete attributesCopy[prop].default;
    }

    attributesCopy[prop] = cleanAttribute(attribute);
  }

  return attributesCopy;
};

module.exports = cleanSchemaAttributes;
