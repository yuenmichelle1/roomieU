const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const ApartmentSchema = new Schema({
    address: {
        type: String,
        trim: true,
        required: true
    },
    management: {
        type: String,
        trim: true
    },
    amenities: {
        type: Array  
    },
    rent: {
        type: Number,
        trim: true,
        required: true
    },
    photos: {
        type: Array,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    link: {
        type: String, 
    }, 
    utilities: {
        type: Array
    }
})

const Apartment = mongoose.model("Apartment", ApartmentSchema);
module.exports = Apartment;