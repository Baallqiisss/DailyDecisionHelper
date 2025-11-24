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
});


module.exports = mongoose.model("Preset", PresetSchema);