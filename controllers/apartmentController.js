const db = require("../models");
const axios = require("axios");

module.exports = {
  find: (req, res) => {
    db.Apartment.findOne({ _id: req.params.id }).then(dbApartment => {
      res.json(dbApartment);
    });
  },
  search: (req, res) => {
    //need to pass requirement for zillow search endpoint in req body
    const ZillowEndpoint = "";
    axios.get(ZillowEndpoint, apartmentData => {
      res.json(apartmentData);
    });
  },
  save: (req, res) => {
    db.Apartment.create(req.body)
      .then(dbApartment => {
        console.log("req.body   " + req.body);
        return db.User.findOneAndUpdate(
          {
            _id: req.params.userId
          },
          {
            $push: {
              apartments: dbApartment._id
            }
          },
          {
            new: true
          }
        );
      })
      .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => res.json(err));
  },

  unsave: (req, res) => {
    db.Apartment.findOneAndRemove({
      _id: req.params.id
    })
      .then(dbApartment => {
        return db.User.findOneAndUpdate(
          {
            _id: req.params.userId
          },
          {
            $pull: {
              apartments: dbApartment._id
            }
          },
          {
            new: true
          }
        );
      })
      .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => res.json(err));
  },

  findSavedApartment: (req, res) => {
    const userAptsArr = req.body;
    db.Apartment.find({ "_id": { "$in": userAptsArr } })
      .then(dbApartments => {
        res.json(dbApartments);
      })
      .catch(err => res.json(err));
  }
};
