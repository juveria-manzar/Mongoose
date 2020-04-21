const mongoose = require("mongoose");
const Hero = mongoose.model("Hero");
const Squad = mongoose.model("Squad");

let data = require("../../Default_Heroes");
let heroData = data.heroes;

function getOverall(hero) {
    let {
        strength: str,
        perception: per,
        endurance: end,
        charisma: cha,
        intelligence: int,
        agility: agi,
        luck: luc,
    } = hero.stats;

    let arr = [str, per, end, cha, int, agi, luc];
    return arr.reduce((acc, val) => acc + val);
}

getIndex = function(req, res, next) {
    res.render("index", { title: "Mongoose" });
};

getHeroesIndex = function(req, res) {
    Hero.find({}, null, { lean: true }, (err, heroes) => {
        if (err) {
            return res.send({ error: err });
        }
        for (hero of heroes) {
            hero.overall = getOverall(hero);
        }
        res.render("heroes", { title: "Hall of Heroes", heroes: heroes });
    });
};

getHeroesForm = function(req, res) {
    Squad.find((err, squads) => {
        if (err) {
            return res.send({ error: err });
        }
        res.render("create-a-hero", { title: "Hall of Heroes", squads: squads });
    });
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
    squad.origin && (squad.origin = squad.origin);

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
        Squad.find((err, squads) => {
            if (err) {
                return res.send({ error: err });
            }
            res.render("update-hero", {
                title: "Update Hero",
                hero: hero,
                squads: squads,
            });
        });
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

        hero.squad = undefined;
        body.squad && (hero.squad = body.squad);
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
    Squad.find({}, null, { lean: true }, (err, squads) => {
        if (err) {
            return res.send({ error: err });
        }

        Hero.find((err, heroes) => {
            if (err) {
                return res.send({ error: err });
            }
            for (let i = 0; i < squads.length; i++) {
                squads[i].heroes = [];
                console.log(heroes[0].squad);
                for (let j = 0; j < heroes.length; j++) {
                    if (heroes[j].squad === squads[i].name) {
                        console.log("helloooooo");
                        squads[i].heroes.push(heroes[j]);
                        heroes.splice(j, 1);
                        j--;
                    }
                }
                console.log(squads[i]);
            }
            res.render("squads", { title: "Super Squads", squads: squads });
        });
    });
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

deleteSquad = function({ params }, res) {
    Squad.findByIdAndRemove(params.squadid, (err, squad) => {
        if (err) {
            return res.send({ error: err });
        }
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
    deleteSquad,
};