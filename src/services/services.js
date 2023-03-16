const db = require("../models");
const { all } = require("../routes/routes");

const getAllContentTypes = async (userId) => {
  const allContentTypeList = [];
  const allContentTypes = await db.Content.findAll({
    where: { userId: userId },
  });
  if (allContentTypes != 0) {
    allContentTypes.forEach((contentType) => {
      allContentTypeList.push({
        contentType: contentType.dataValues.contentType,
        id: contentType.dataValues.id,
      });
    });
    return allContentTypeList;
  } else {
    throw new Error("No Content Types Found for this user");
  }
};

const saveContentTypes = async (data) => {
  const { contentType, contentStructure, userId } = data;
  return await db.Content.create({ userId, contentType, contentStructure });
};

const getContentTypesFromId = async (id) => {
  const allContentTypeList = [];
  const allContentTypes = await db.Content.findAll({ where: { userId: id } });
  if (allContentTypes != 0) {
    allContentTypes.forEach((contentType) => {
      allContentTypeList.push(contentType.dataValues.contentType);
    });
    return allContentTypeList;
  } else {
    throw new Error("No Content Types Found for this user");
  }
};

const updateContentTypes = async (data) => {
  const { contentType, contentStructure } = data;
  console.log(contentType, contentStructure);
  const dataExtracted = await db.Content.findOne({
    where: { contentType: contentType },
  });
  const existingStructure = dataExtracted.dataValues.contentStructure;
  if (existingStructure == null) {
    return await db.Content.update(
      { contentStructure: contentStructure },
      { where: { contentType: contentType } }
    );
  } else {
    const newStructure = Object.assign(existingStructure, contentStructure);
    return await db.Content.update(
      { contentStructure: newStructure },
      { where: { contentType: contentType } }
    );
  }
};

const getContentStructure = async ({ userId, contentType }) => {
  const contentStructure = await db.Content.findOne({
    where: { userId: userId, contentType: contentType },
  });
  if (contentStructure != null) {
    return contentStructure.dataValues.contentStructure;
  }
};

const deleteContentTypes = async (id, data) => {
  const { contentType, contentStructure } = data;
  const dataExtracted = await db.Content.findOne({
    where: { userId: id, contentType: contentType },
  });
  console.log(dataExtracted);
  const existingStructure = dataExtracted.dataValues.contentStructure;
  const keys = Object.keys(contentStructure);
  delete existingStructure[keys[0]];
  return await db.Content.update(
    { contentStructure: existingStructure },
    { where: { userId: id, contentType: contentType } }
  );
};

const saveCollections = async (data) => {
  const { Collection_Name, Collection_Value, contentType, userId } = data;
  const contents = await db.Content.findOne({
    where: { userId: userId, contentType: contentType },
  });
  const content_id = contents.dataValues.id;
  return await db.Collections.create({
    Collection_Name,
    Collection_Value,
    content_id: content_id,
  });
};

const getCollectionsFromId = async (id) => {
  const allCollectionsData = await db.Collections.findAll({
    where: { content_id: id },
    include: [
      {
        model: db.Content,
        attributes: ["contentType", "contentStructure"],
      },
    ],
  });
  return allCollectionsData;
};

const getAllFieldValues = async (id, contentType) => {
  const allFields = [];
  const allFieldValues = await db.Collections.findAll({
    include: [
      {
        model: db.Content,
        where: { userId: id, contentType: contentType },
        attributes: ["contentStructure"],
      },
    ],
  });
  const contentStructure =
    allFieldValues[0]?.dataValues.Content.contentStructure;
  allFieldValues.forEach((field) => {
    allFields.push(field.dataValues.Collection_Value);
  });
  return { allFields, contentStructure };
};

module.exports = {
  saveContentTypes,
  getContentTypesFromId,
  updateContentTypes,
  getContentStructure,
  deleteContentTypes,
  saveCollections,
  getCollectionsFromId,
  getAllFieldValues,
  getAllContentTypes,
};
