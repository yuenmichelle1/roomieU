const db = require("../models");

module.exports = {
    find: (req, res) => {
        db.User.findOne({_id: req.params.id}).then((dbUser) => {
            res.json(dbUser);
        });
    },
    findAll: (req, res)=> {
        db.User.find({}).then((dbUsers)=> res.json(dbUsers));
    },
    create: (req, res) => {
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