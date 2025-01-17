const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const statsSchema = new mongoose.Schema({
    strength: { type: Number, default: 30, min: 0, max: 100 },
    perception: { type: Number, default: 30, min: 0, max: 100 },
    endurance: { type: Number, default: 30, min: 0, max: 100 },
    charisma: { type: Number, default: 30, min: 0, max: 100 },
    intelligence: { type: Number, default: 30, min: 0, max: 100 },
    agility: { type: Number, default: 30, min: 0, max: 100 },
    luck: { type: Number, default: 30, min: 0, max: 100 },
});

const heroSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    origin: { type: String, default: "unkown" },
    stats: { type: statsSchema, required: true },
    squad: String,
});

const squadSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    hq: String,
});

mongoose.model("Hero", heroSchema);
mongoose.model("Squad", squadSchema);