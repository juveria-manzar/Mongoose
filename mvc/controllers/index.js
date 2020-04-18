const mongoose = require('mongoose')
const Hero = mongoose.model('Hero')

getIndex = function(req, res, next) {
    res.render('index', { title: 'Mongoose' });
}

getHeroesIndex = function(req, res) {
    res.render('heroes', { title: 'Hall of Heroes' })
}

getHeroesForm = function(req, res) {
    res.render('create-a-hero', { title: 'Hall of Heroes' })
}

createNewHero = function({ body }, res) {
    let hero = {
        name: body.name,
        desc: body.desc,
        stats: {
            strength: body.strength,
            percepttion: body.percepttion,
            endurance: body.endurance,
            charisma: body.charisma,
            intelligence: body.intelligence,
            luck: body.luck
        }
    }
    body.origin && (hero.origin = body.origin)

    Hero.create(hero, (err, newHero) => {
        if (err) { return res.send({ error: err }); }
    })
}

module.exports = {
    getIndex,
    getHeroesIndex,
    getHeroesForm
};