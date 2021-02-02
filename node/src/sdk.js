require('dotenv').config({ path: '.env' });
const _ = require('lodash');
const hubspot = require('@hubspot/api-client');

const { logResponse, handleError } = require('./helpers/common');
const { logger } = require('./helpers/logger');

const OBJECTS_LIMIT = 100;

const hubspotClient = new hubspot.Client({
  apiKey: process.env.HUBSPOT_API_KEY,
});

const getAllObjects = async ({ objectType, properties, query }) => {
  const objects = [];
  let objectsResponse;
  let after;
  do {
    if (_.isNil(query) || _.isEmpty(query)) {
      // Get CRM Object
      // GET /crm/v3/objects/{objectType}
      // https://developers.hubspot.com/docs/api/crm/{objectType}
      logger.log(
        `Calling crm.${objectType}.basicApi.getPage API method. Retrieve ${objectType}`
      );
      objectsResponse = await hubspotClient.crm[objectType].basicApi.getPage(
        OBJECTS_LIMIT,
        after,
        properties
      );
    } else {
      // Search for CRM object
      // POST /crm/v3/objects/{objectType}/search
      // https://developers.hubspot.com/docs/api/crm/{objectType}
      logger.log(
        `Calling crm.${objectType}.searchApi.doSearch API method. Retrieve ${objectType} with search query:`,
        query
      );
      objectsResponse = await hubspotClient.crm[objectType].searchApi.doSearch({
        query,
        limit: OBJECTS_LIMIT,
        properties,
        filterGroups: [],
        after,
      });
    }
    logResponse(objectsResponse);
    after = _.get(objectsResponse, 'body.paging.next.after');
    objects.push(...objectsResponse.body.results);
  } while (!_.isNil(after));

  return objects;
};

const createObject = async ({ objectType, properties }) => {
  try {
    // Create CRM object
    // POST /crm/v3/objects/{objectType}/
    // https://developers.hubspot.com/docs/api/crm/{objectType}
    logger.log(
      `Calling crm.${objectType}.basicApi.create API method. Create new ${objectType}`
    );
    const createResponse = await hubspotClient.crm[objectType].basicApi.create({
      properties,
    });
    logResponse(createResponse);

    const objectId = _.get(createResponse, 'body.id');
    logger.log(`Created ${objectType} with id ${objectId}`);
    return objectId;
  } catch (e) {
    handleError(e);
  }
};

const archiveObject = async ({ objectId, objectType }) => {
  try {
    // Archive an object
    // DELETE /crm/v3/objects/{objectType}/:objectId
    // https://developers.hubspot.com/docs/api/crm/{objectType}
    logger.log(
      `Calling crm.${objectType}.basicApi.archive API method. Update ${objectType} with id:`,
      objectId
    );
    const archiveResponse = await hubspotClient.crm[
      objectType
    ].basicApi.archive(objectId);
    logResponse(archiveResponse);
    logger.log(`Archived ${objectType} with id ${objectId}`);
    return objectId;
  } catch (e) {
    handleError(e);
  }
};

const updateObject = async ({ objectId, objectType, properties }) => {
  try {
    // Update an object
    // POST /crm/v3/objects/{objectType}/:objectId
    // https://developers.hubspot.com/docs/api/crm/{objectType}
    logger.log(
      `Calling crm.${objectType}.basicApi.update API method. Update ${objectType} with id:`,
      objectId
    );
    logger.log(`Properties: ${JSON.stringify(properties)}`);
    const updateResponse = await hubspotClient.crm[
      objectType
    ].basicApi.update(objectId, { properties });
    logResponse(updateResponse);
    logger.log(`Updated ${objectType} with id ${objectId}`);
    return objectId;
  } catch (e) {
    handleError(e);
  }
};

const getObject = async ({ objectId, objectType }) => {
  try {
    if (_.isNil(objectId)) {
      logger.error(`Missed ${objectType}`);
      return;
    }

    // Get All {objectType} Properties
    // GET /crm/v3/properties/:objectType
    // https://developers.hubspot.com/docs/api/crm/properties
    logger.log(
      `Calling crm.properties.coreApi.getAll API method. Retrieve all ${objectType} properties`
    );
    const propertiesResponse = await hubspotClient.crm.properties.coreApi.getAll(
      objectType
    );
    logResponse(propertiesResponse);

    const objectPropertiesNames = _.map(
      propertiesResponse.body.results,
      'name'
    );

    // Get {objectType} record by its id
    // GET /crm/v3/objects/{objectType}/:objectId
    // https://developers.hubspot.com/docs/api/crm/{objectType}
    logger.log(
      `Calling crm.${objectType}.basicApi.getById API method. Retrieve ${objectType} by id:`,
      objectId
    );
    const objectResponse = await hubspotClient.crm[objectType].basicApi.getById(
      objectId,
      objectPropertiesNames
    );
    logResponse(objectResponse);

    return objectResponse;
  } catch (e) {
    handleError(e);
  }
};

const getProperties = async ({ objectType }) => {
  try {
    // Get All {ObjectType} Properties
    // GET /crm/v3/properties/:objectType
    // https://developers.hubspot.com/docs/api/crm/properties
    logger.log(
      'Calling crm.properties.coreApi.getAll API method. Retrieve all contacts properties'
    );
    const propertiesResponse = await hubspotClient.crm.properties.coreApi.getAll(
      objectType
    );
    logResponse(propertiesResponse);

    return propertiesResponse.body.results;
  } catch (e) {
    handleError(e);
  }
};

module.exports = {
  getAllObjects,
  getObject,
  getProperties,
  createObject,
  updateObject,
  archiveObject,
};
