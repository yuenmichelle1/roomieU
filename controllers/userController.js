const db = require("../models");

module.exports = {
    find: function (req, res) {
        db.User.findOne({_id: req.params.id}).then((dbUser) => {
            res.json(dbUser);
        });
    },
    findAll: (req, res)=> {
        db.User.find({}).then((dbUsers)=> res.json(dbUsers));
    },
    create: function (req, res) {
        // req.body => {name: "name", price: 1.50}
        db.User.create(req.body).then((dbUser) => {
            res.json(dbUser);
        });
    },
    delete: (req, res)=> {
        const _id = req.params.id;
        db.User
          .deleteOne({_id})
          .then((dbUser)=> res.json(dbUser));
    }
}