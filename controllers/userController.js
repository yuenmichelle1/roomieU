const db = require("../models");

module.exports = {
  find: (req, res) => {
    db.User.findOne({ _id: req.params.id }).then(dbUser => {
      res.json(dbUser);
    });
  },
  findAll: (req, res) => {
    db.User.find({}).then(dbUsers => res.json(dbUsers));
  },
  create: (req, res) => {
    db.User.create(req.body).then(dbUser => {
      res.json(dbUser);
    });
  },
  delete: (req, res) => {
    const _id = req.params.id;
    db.User.deleteOne({ _id }).then(dbUser => res.json(dbUser));
  },
  update: (req, res) => {
    db.User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      {
        new: true
      }
    )
      .then(dbUser => {
        if (dbUser) {
          res.json("user updated");
        } else {
          res.json("user doesn't exist");
        }
      })
      .catch(err => res.json(err));
  },
  filter: (req, res) => {
    const usersProjection = {
      roommatePrefs: false,
      candidateRoomies: false,
      requestedRoomies: false,
      apartments: false,
      school: false,
      __v: false,
      budget: false,
      radius: false,
      salt: false,
      hash: false
    };
    db.User.find(req.body, usersProjection).then(dbUser => {
      console.log(dbUser);
      res.json(dbUser);
    }).catch(err => res.json(err));
  },

  getPopulatedUserInfo: (req, res) => {
    db.User.findOne({ _id: req.params.id }).populate("candidateRoomies").populate("requestedRoomies").exec((err,dbUser)=> {
        if (err) throw err;
        console.log("line62 in usercontroller" + dbUser)
        res.json(dbUser);
      });
  }

//   app.get("/comments/read/:id", (req, res) => {
//     db.News.findOne({
//             _id: req.params.id
//         })
//         .populate("notes")
//         .then(function (dbNews) {
//             res.json(dbNews)
//         })
//         .catch(err => res.json(err))

// })
//   getLikes: (req, res) => {
//     let id = req.body;
//     console.log(`THIS IS MY ROUTER ${id}`);
//     db.User.find({"_id": {"$in": id}}).then(dbUsers => {
//       res.json(dbUsers);
//     }).catch(err => res.json(err));
//   }
};
