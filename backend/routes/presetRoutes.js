const express = require("express");
const multer = require("multer");
const path = require("path");
const { createPreset, getPresets, getRecommendation, deletePreset, attachFiles, getPreset, updatePreset } = require("../controllers/presetController");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

// setup multer storage
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '..', 'uploads'));
	},
	filename: function (req, file, cb) {
		const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
		cb(null, unique + '-' + file.originalname.replace(/\s+/g, '_'));
	}
});
const upload = multer({ storage });


router.get("/", auth, getPresets);
// allow multipart form-data on create (files optional) - field name: files
router.post("/", auth, upload.array('files'), createPreset);
router.get("/:id", auth, getPreset);
router.get("/:id/recommend", auth, getRecommendation);
router.delete("/:id", auth, deletePreset);
// attach files to existing preset
router.post("/:id/upload", auth, upload.array('files'), attachFiles);
router.put("/:id", auth, upload.array('files'), updatePreset);


module.exports = router;