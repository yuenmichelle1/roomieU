const db = require("../models");

module.exports = {
    find: (req, res)=>{
        db.Apartment.findOne({_id: req.params.id}).then((dbApartment)=>{
            res.json(dbApartment);
        });
    },
    findAll: (req, res)=> {
        db.Apartment.find({}).then((dbApartments)=> res.json(dbApartments));
    },
    create: (req, res) => {
        // req.body => {name: "name", price: 1.50}
        db.Apartment.create(req.body).then((dbApartment)=>{
            res.json(dbApartment);
        });
    },
    delete: (req, res)=> {
        const _id = req.params.id;
        db.Apartment
          .deleteOne({_id})
          .then((dbApartment)=> res.json(dbApartment));
    }
}