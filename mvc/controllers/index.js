getIndex = function(req, res, next) {
    res.render('index', { title: 'Mongoose' });
}

getHeroesIndex = function(req, res) {
    res.render('heroes', { title: 'Hall of Heroes' })
}

getHeroesForm = function(req, res) {
    res.render('create-a-hero', { title: 'Hall of Heroes' })
}

module.exports = {
    getIndex,
    getHeroesIndex,
    getHeroesForm
};