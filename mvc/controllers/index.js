const mongoose = require("mongoose");
const Hero = mongoose.model("Hero");
const Squad = mongoose.model("Squad");

let data = require("../../Default_Heroes");
let heroData = data.heroes;

getIndex = function(req, res, next) {
    res.render("index", { title: "Mongoose" });
};

getHeroesIndex = function(req, res) {
    Hero.find((err, heroes) => {
        if (err) {
            return res.send({ error: err });
        }
        res.render("heroes", { title: "Hall of Heroes", heroes: heroes });
    });
};

getHeroesForm = function(req, res) {
    res.render("create-a-hero", { title: "Hall of Heroes" });
};

createNewHero = function({ body }, res) {
    let hero = {
        name: body.name,
        desc: body.desc,
        stats: {
            strength: body.strength,
            perception: body.perception,
            endurance: body.endurance,
            charisma: body.charisma,
            intelligence: body.intelligence,
            luck: body.luck,
        },
    };
    body.origin && (hero.origin = body.origin);

    Hero.create(hero, (err, newHero) => {
        if (err) {
            return res.send({ error: err });
        }
        res.redirect("/heroes");
    });
};

deleteHero = function({ params }, res) {
    Hero.findByIdAndRemove(params.heroid, (err, hero) => {
        if (err) {
            return res.send({ error: err });
        }
        res.redirect("/heroes");
    });
};
getUpdateForm = function({ params }, res) {
    Hero.findById(params.heroid, (err, hero) => {
        if (err) {
            return res.send({ error: err });
        }
        res.render("update-hero", { title: "Update Hero", hero: hero });
    });
};

updateHero = function({ params, body }, res) {
    Hero.findById(params.heroid, (err, hero) => {
        if (err) {
            return res.send({ error: err });
        }
        hero.name = body.name;
        hero.desc = body.desc;
        hero.origin = body.origin;
        hero.stats.strength = body.strength;
        hero.stats.perception = body.perception;
        hero.stats.endurance = body.endurance;
        hero.stats.charisma = body.charisma;
        hero.stats.intelligence = body.intelligence;
        hero.stats.agility = body.agility;
        hero.stats.luck = body.luck;

        hero.save((err, updatedHero) => {
            if (err) {
                return res.send({ error: err });
            }
            res.redirect("/heroes");
        });
    });
};

reset = function(req, res) {
    Hero.deleteMany({}, (err, info) => {
        if (err) {
            return res.send({ error: err });
        }
        Hero.insertMany(heroData, (err, info) => {
            if (err) {
                return res.send({ error: err });
            }
            res.redirect("/heroes");
        });
    });
};

getSquadsIndex = function(req, res) {
    res.render("squads", { title: "Super Squads" });
};

getSquadForm = function(req, res) {
    res.render("create-squad", { title: "Create a Squad" });
};

createSquad = function({ body }, res) {
    let squad = {
        name: body.name,
    };
    body.hq && (squad.hq = body.hq);
    squad.hq || (squad.hq = "Unkown");

    Squad.create(squad, (err, squad) => {
        if (err) {
            return res.send({ error: err });
        }
        console.log(squad);
        res.redirect("/squads");
    });
};
module.exports = {
    getIndex,
    getHeroesIndex,
    getHeroesForm,
    createNewHero,
    deleteHero,
    getUpdateForm,
    updateHero,
    reset,
    getSquadsIndex,
    getSquadForm,
    createSquad,
};