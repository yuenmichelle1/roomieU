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

    const user = req.body;
    const excludeIds = [...user.requestedRoomies.concat(user.candidateRoomies).concat(user._id)]
    const filters = {
        school: user.school,
        radius: user.radius,
        budget: user.budget,
        _id: { $nin: excludeIds}
      }
    db.User.find(filters).then(dbUser => {
      res.json(dbUser);
    }).catch(err => res.json(err));
  },

  getPopulatedUserInfo: (req, res) => {
    db.User.findOne({ _id: req.params.id }).populate("candidateRoomies").populate("requestedRoomies").exec((err,dbUser)=> {
        if (err) throw err;
        res.json(dbUser);
      })
  },
  cancelRoomie: (req, res) => {
    db.User.findByIdAndUpdate(
        req.params.id,
        {
            $push: {dislikedRoomies: req.body.dislikedId}

        },
        {
            new: true
        }
    ).then(dbUser =>{
        res.json(dbUser)      
    }).catch(err => res.json(err));
},
  requestRoomie: (req, res) => {
    db.User.findByIdAndUpdate(
        req.params.id,
        {
          $push: {requestedRoomies:req.body.requestedId}
        },
        {
          new: true
        }
      )
        .then(dbUser => {
            db.User.findByIdAndUpdate(
                req.body.requestedId,
                {
                  $push: {candidateRoomies:req.params.id}
                },
                {
                  new: true
                }
              ).then(requestedUser=>{
                if (dbUser && requestedUser) {
                    res.json("both users updated");
                  } else {
                    res.json("user doesn't exist");
                  }
              })
        })
        .catch(err => res.json(err));
  }
};
