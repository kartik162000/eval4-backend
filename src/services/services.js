const db = require('../models');
const saveContentTypes = async (data) => {
    const {contentType,contentStructure,userId} = data;
    
    return await db.Content.create( {userId,contentType,contentStructure});
};

const getContentTypesFromId = async (id) => {
    const allContentTypeList=[];
    const allContentTypes=await db.Content.findAll({where:{userId:id}});
    if(allContentTypes!=0)
    {
        allContentTypes.forEach((contentType) => {
            allContentTypeList.push(contentType.dataValues.contentType);
        }
        );
        return allContentTypeList;
    }
    else
    {
        throw new Error("No Content Types Found for this user");
    }
};

const updateContentTypes = async (id,data) => {
    const {contentType,contentStructure} = data;
    console.log(contentType,contentStructure);
    const dataExtracted=await db.Content.findOne({where:{userId:id,contentType:contentType}});
    const existingStructure=(dataExtracted.dataValues.contentStructure);
    if(existingStructure===null)
    {
        return await db.Content.update({contentStructure:contentStructure},{where:{userId:id,contentType:contentType}});
    }
        const keys = Object.keys(contentStructure);
        const values = Object.values(contentStructure); 
        const newStructure=existingStructure[keys[0]]=values[0];
        console.log(newStructure);
        return await db.Content.update({contentStructure:newStructure},{where:{userId:id,contentType:contentType}});
};

const getContentStructure = async ({userId,contentType}) => {
    const contentStructure = await db.Content.findOne({where:{userId:userId,contentType:contentType}});
    if(contentStructure!=null)
    {
        return (contentStructure.dataValues.contentStructure);
    }
};

const deleteContentTypes = async (id,data) => {
    const {contentType,contentStructure} = data;
    const dataExtracted=await db.Content.findOne({where:{userId:id,contentType:contentType}});
    console.log(dataExtracted);
    const existingStructure=(dataExtracted.dataValues.contentStructure);
    const keys = Object.keys(contentStructure);
    delete existingStructure[keys[0]]; 
    return await db.Content.update({contentStructure:existingStructure},{where:{userId:id,contentType:contentType}
    });
};

const saveCollections=async (data) => {
    const {Collection_Name,Collection_Value,content_id} = data;
    return await db.Collections.create({Collection_Name,Collection_Value,content_id:content_id});
};

const getCollectionsFromId = async (id) => {
    const allCollectionsData = await db.Collections.findAll({
        where: { content_id: id },
        include: [
          {
            model: db.Content,
            attributes: ['contentType', 'contentStructure']
          }
        ]
      });
    return allCollectionsData;
};

module.exports = {
    saveContentTypes,
    getContentTypesFromId,
    updateContentTypes,
    getContentStructure,
    deleteContentTypes,
    saveCollections,
    getCollectionsFromId
};
    