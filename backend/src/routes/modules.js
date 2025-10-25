const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const moduleController = require("../controllers/moduleController");

router.post("/", auth, moduleController.createModule);
router.get("/", moduleController.listModules);
router.get("/:id", moduleController.getModule);
router.put("/:id", auth, moduleController.updateModule);
router.delete("/:id", auth, moduleController.deleteModule);

module.exports = router;
