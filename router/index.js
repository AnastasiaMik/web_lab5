var express = require("express");
var router = express.Router();

var controller = require("../docs/docs");

router.get("/docs", controller.getDoc);

router.post("/docs", controller.createDocs);

router.put("/docs/:id", controller.updateDocs);

router.delete("/docs/:id", controller.deleteDocs);

module.exports = router;
