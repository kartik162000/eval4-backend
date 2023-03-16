const controllers = require("../controllers/controllers");
const express = require("express");
const router = express.Router();
const verifyJwt = require("../middlewares/verifyJwt");

router.post("/content-type/save", verifyJwt,controllers.saveContentTypes);
router.get("/content-type/all/:userId",verifyJwt, controllers.getAllContentTypes);
router.get(
  "/content-type/:contentType/:userId",
  verifyJwt,
  controllers.getContentStructure
);
router.get("/content-type/:id", verifyJwt,controllers.getContentTypesFromId);
router.patch(
  "/content-type/update/:contentType",
  verifyJwt,
  controllers.updateContentTypes
);
router.delete("/content-type/delete/:id", 
verifyJwt,
controllers.deleteContentTypes);

router.post("/collection/save",
verifyJwt,
 controllers.saveCollections);
router.get("/collection/:id",
verifyJwt,
 controllers.getCollectionsFromId);
router.get(
  "/collection/allFields/:id/:contentType",
  verifyJwt,
  controllers.getAllFieldValues
);

module.exports = router;
