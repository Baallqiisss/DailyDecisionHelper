const Preset = require("../models/Preset");


exports.createPreset = async (req, res) => {
	// support multipart/form-data with files via multer
	const data = typeof req.body === 'object' ? { ...req.body } : {};
	// parse fields that may be sent as strings
	const presetData = {
		title: data.title,
		mood: data.mood,
		time: data.time,
		budget: data.budget,
		userId: req.user.id
	};

	// handle files attached by multer (array)
	if (req.files && req.files.length) {
		presetData.attachments = req.files.map(f => ({
			filename: f.filename,
			originalname: f.originalname,
			mimetype: f.mimetype,
			url: `/uploads/${f.filename}`
		}));
	}

	const preset = await Preset.create(presetData);
	res.json(preset);
};


exports.getPresets = async (req, res) => {
const presets = await Preset.find({ userId: req.user.id });
res.json(presets);
};

// Simple rule-based recommendations based on mood, time and budget
exports.getRecommendation = async (req, res) => {
	const { id } = req.params;
	const preset = await Preset.findById(id);
	if (!preset) return res.status(404).json({ message: "Preset not found" });

	const { mood, time, budget } = preset;

	// Basic candidate lists
	const foods = {
		happy: ["Sushi", "Pasta", "Ice cream"],
		tired: ["Smoothie", "Ramen", "Sandwich"],
		default: ["Nasi goreng", "Ayam goreng", "Salad"]
	};

	const outfits = {
		happy: ["Casual bright outfit", "Floral dress", "Denim jacket"],
		tired: ["Comfy hoodie", "Loose tee and joggers", "Cardigan"],
		default: ["Smart casual", "Jeans + shirt", "Comfortable sneakers"]
	};

	const activities = {
		quick: ["Grab a coffee", "Take a short walk", "Listen to a podcast"],
		santai: ["Read a book", "Light cooking", "Meet a friend"],
		lama: ["Go hiking", "Visit a museum", "Take a class"]
	};

	// Heuristics
	const pickFood = () => {
		if (/happy/i.test(mood)) return foods.happy;
		if (/tired/i.test(mood)) return foods.tired;
		return foods.default;
	};

	const pickOutfit = () => {
		if (/happy/i.test(mood)) return outfits.happy;
		if (/tired/i.test(mood)) return outfits.tired;
		return outfits.default;
	};

	const pickActivity = () => {
		if (/cepat|quick/i.test(time)) return activities.quick;
		if (/santai|relax|medium|sedang/i.test(time)) return activities.santai;
		return activities.lama;
	};

	// Budget influence (filter or prefer)
	const applyBudget = (items) => {
		if (/hemat|low/i.test(budget)) return items.slice(0, 2);
		if (/sedang|medium/i.test(budget)) return items.slice(0, 3);
		return items; // bebas -> full list
	};

	const recommendations = {
		food: applyBudget(pickFood()),
		outfit: applyBudget(pickOutfit()),
		activity: applyBudget(pickActivity())
	};

	res.json({ recommendations });
};

exports.getPreset = async (req, res) => {
	const { id } = req.params;
	const preset = await Preset.findById(id);
	if (!preset) return res.status(404).json({ message: 'Preset not found' });
	// ensure owner
	if (preset.userId.toString() !== req.user.id) return res.status(403).json({ message: 'Not allowed' });
	res.json(preset);
};

exports.updatePreset = async (req, res) => {
	const { id } = req.params;
	const preset = await Preset.findById(id);
	if (!preset) return res.status(404).json({ message: 'Preset not found' });

	if (preset.userId.toString() !== req.user.id) return res.status(403).json({ message: 'Not allowed' });

	// update fields from body (support multipart/form-data or json)
	const data = typeof req.body === 'object' ? { ...req.body } : {};
	if (data.title !== undefined) preset.title = data.title;
	if (data.mood !== undefined) preset.mood = data.mood;
	if (data.time !== undefined) preset.time = data.time;
	if (data.budget !== undefined) preset.budget = data.budget;

	// handle new files
	if (req.files && req.files.length) {
		const newFiles = req.files.map(f => ({
			filename: f.filename,
			originalname: f.originalname,
			mimetype: f.mimetype,
			url: `/uploads/${f.filename}`
		}));
		preset.attachments = (preset.attachments || []).concat(newFiles);
	}

	await preset.save();
	res.json(preset);
};

exports.attachFiles = async (req, res) => {
	const { id } = req.params;
	const preset = await Preset.findById(id);
	if (!preset) return res.status(404).json({ message: "Preset not found" });

	// verify owner
	if (preset.userId.toString() !== req.user.id) {
		return res.status(403).json({ message: "Not allowed" });
	}

	if (!req.files || !req.files.length) return res.status(400).json({ message: "No files uploaded" });

	const newFiles = req.files.map(f => ({
		filename: f.filename,
		originalname: f.originalname,
		mimetype: f.mimetype,
		url: `/uploads/${f.filename}`
	}));

	preset.attachments = (preset.attachments || []).concat(newFiles);
	await preset.save();

	res.json({ attachments: newFiles });
};

exports.deletePreset = async (req, res) => {
	const { id } = req.params;
	const preset = await Preset.findById(id);
	if (!preset) return res.status(404).json({ message: "Preset not found" });

	// only owner can delete
	if (preset.userId.toString() !== req.user.id) {
		return res.status(403).json({ message: "Not allowed" });
	}

	await Preset.findByIdAndDelete(id);
	res.json({ message: "Preset deleted" });
};