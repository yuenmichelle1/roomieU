const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    budget: {
        type: String,
        trim: true,
        require: true
    },
    radius: {
        type: String,
        trim: true,
        require: true
    },
    photo: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    bio: {
        type: String,
        trim: true
    },
    school: {
        type:String, 
        trim: true
    },
    userQuals: {
        type: Array        
    },

    roommatePrefs: {
        type: Array
    },
    candidateRoomies:[
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    requestedRoomies:[
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    matchedRoomie: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    apartments:[
        {
            type: String,
            ref: "Apartment"
        }
    ]
})

UserSchema.plugin(passportLocalMongoose,{usernameField:"email"});

const User = mongoose.model("User", UserSchema);

module.exports = User;
