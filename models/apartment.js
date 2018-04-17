const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const ApartmentSchema = new Schema({
    // address: {
    //     type: String,
    //     trim: true,
    //     required: true
    // },
    // layout: {
    //     type: String,
    //     trim: true,
    //     required: true
    // },
    // rent: {
    //     type: Number,
    //     trim: true,
    //     required: true
    // },
    // photo: {
    //     type: String,
    //     trim: true,
    //     required: true
    // },
    description: {
        type: String,
        trim: true,
        required: true
    }
})

const Apartment = mongoose.model("Apartment", ApartmentSchema);
module.exports = Apartment;