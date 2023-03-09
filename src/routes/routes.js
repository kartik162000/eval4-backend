const controllers=require('../controllers/controllers');
const express=require('express');
const router=express.Router();


router.post('/content-type/save',controllers.saveContentTypes);
router.get('/content-type/content-structure/',controllers.getContentStructure);
router.get('/content-type/:id',controllers.getContentTypesFromId);
router.patch('/content-type/update/:id',controllers.updateContentTypes);
router.delete('/content-type/delete/:id',controllers.deleteContentTypes);

router.get('/collection/:id',controllers.getCollectionsFromId);
router.post('/collection/save',controllers.saveCollections);


module.exports=router;