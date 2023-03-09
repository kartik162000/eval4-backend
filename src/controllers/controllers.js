
const services = require('../services/services');
const saveContentTypes = async (req, res) => {
    try
    {
        console.log(req.body);
        const {contentType,userId,contentStructure} = req.body;

        const newContentType = await services.saveContentTypes({contentType,userId,contentStructure});
        res.status(201).json({ newContentType });
    }
    catch (error)
    {
        res.status(500).json({error:error.message});
    }
};

const getContentTypesFromId = async (req, res) => {
    try
    {
        const {id} = req.params;
        const contentType = await services.getContentTypesFromId(id);
        res.status(200).json({ contentType });
    }
    catch (error)
    {
        res.status(500).json({error:error.message});
    }
};
const updateContentTypes = async (req, res) => {
    try
    {
            const {id}=req.params;
            const {contentType,contentStructure} = req.body;
            const updatedContentType = await services.updateContentTypes(id,{contentType,contentStructure});
            res.status(200).json({ updatedContentType });
    }
    catch (error)
    {
        res.status(500).json({error:error.message});
    }
};

const getContentStructure = async (req, res) => {
    try
    {
        const {userId,contentType} = req.body;
        const contentStructure = await services.getContentStructure({userId,contentType});
        res.status(200).json({ contentStructure });
    }
    catch (error)
    {
        res.status(500).json({error:error.message});
    }
};

const deleteContentTypes = async (req, res) => {
    try
    {
        const {id} = req.params;
        const {contentType,contentStructure} = req.body;
        const deletedContentType = await services.deleteContentTypes(id,{contentType,contentStructure});
        res.status(200).json({ deletedContentType });
    }
    catch (error)
    {
        res.status(500).json({error:error.message});
    }
};

const saveCollections = async (req, res) => {
    try
    {
        const {Collection_Name,Collection_Value,content_id} = req.body;
        const newCollection = await services.saveCollections({Collection_Name,Collection_Value,content_id});
        res.status(201).json({ newCollection });
    }
    catch (error)
    {
        res.status(500).json({error:error.message});
    }
};

const getCollectionsFromId = async (req, res) => {
    try
    {
        const {id} = req.params;
        const collection = await services.getCollectionsFromId(id);
        res.status(200).json({ collection });
    }
    catch (error)
    {
        res.status(500).json({error:error.message});
    }
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