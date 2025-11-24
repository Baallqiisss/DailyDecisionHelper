const mongoose = require("mongoose");


const PresetSchema = new mongoose.Schema({
title: String,
mood: String,
time: String,
budget: String,
userId: {
type: mongoose.Schema.Types.ObjectId,
ref: "User"
}
,
attachments: [
	{
		filename: String,
		originalname: String,
		mimetype: String,
		url: String
	}
]
});


module.exports = mongoose.model("Preset", PresetSchema);