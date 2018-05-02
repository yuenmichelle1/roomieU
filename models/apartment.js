const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const ApartmentSchema = new Schema({
    listingName: {
        type: String,
        trim: true,
        required: true
    },
    address: {
        type: String,
        trim: true,
        required: true
    },
    city: {
        type: String,
        trim: true,
        required: true
    },
    rent: {
        type: Number,
        trim: true,
        required: true
    },
    features: {
        type: Array,
        required: true
    },
    photos: {
        type: Array,
        trim: true,
        required: true
    },
    propertyType: {
        type: String,
        trim: true,
        required: true
    },
    link: {
        type: String,
        trim: true
    },
    latitude: {
        type: String,
        trim: true
    },
    longitude: {
        type: String,
        trim: true
    }
})

const Apartment = mongoose.model("Apartment", ApartmentSchema);
module.exports = Apartment;