const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true);

const statsSchema = new mongoose.Schema({
    strength: { type: Number, default: 30, min: 0, max: 30 },
    perception: { type: Number, default: 30, min: 0, max: 30 },
    endurance: { type: Number, default: 30, min: 0, max: 30 },
    charisma: { type: Number, default: 30, min: 0, max: 30 },
    intelligence: { type: Number, default: 30, min: 0, max: 30 },
    agility: { type: Number, default: 30, min: 0, max: 30 },
    luck: { type: Number, default: 30, min: 0, max: 30 },
})

const heroSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    origin: { type: String, default: "unkown" },
    stats: { type: statsSchema, required: true }
})

const squadSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
})




mongoose.model('Hero', heroSchema)