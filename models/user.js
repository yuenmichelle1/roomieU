const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },

    email: {
        type: String,
        trim: true,
        required: true
    },

    password: {
        type: String,
        trim: true,
        required: true
    },

    budget: {
        type: Number,
        trim: true,
        require: true
    },

    radius: {
        type: Number,
        trim: true,
        require: true
    },
    photo: {
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

    // gender: {
    //     type: String,
    //     trim: true
    // },

    // schedule: {
    //     type: String,
    //     trim: true
    // },

    // smoke: {
    //     type: Boolean,
    // },

    // pets: {
    //     type: Boolean,
    // },

    // party: {
    //     type: Boolean,
    //     trim: true
    // },
    userQuals: {
        type: Array        
    },

    userPrefs: {
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
            type: Schema.Types.ObjectId,
            ref: "Apartment"
        }
    ]
})

const User = mongoose.model("User", UserSchema);

module.exports = User;
