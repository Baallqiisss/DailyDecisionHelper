const express = require("express");
const { createPreset, getPresets, getRecommendation, deletePreset } = require("../controllers/presetController");
const auth = require("../middleware/authMiddleware");
const router = express.Router();


router.get("/", auth, getPresets);
router.post("/", auth, createPreset);
router.get("/:id/recommend", auth, getRecommendation);
router.delete("/:id", auth, deletePreset);


module.exports = router;