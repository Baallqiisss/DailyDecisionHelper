const Preset = require("../models/Preset");


exports.createPreset = async (req, res) => {
const preset = await Preset.create({
...req.body,
userId: req.user.id
});
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