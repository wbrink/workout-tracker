// exercise will have two types either Cardio or Resistance

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Cardio Schema
const ExerciseSchema = new Schema({
  name: {
    type: String,
    maxlength: 100, 
    required: true,
    unique: true
  },

  // distance and duration fields are if the exercise type is cardio
  distance: {
    type: Number,
    required: true,
    min: [0, "Must Enter value greater than 0"],
    max: 1000,
  },
  duration: {
    type: Number,
    required: true,
    min: [0, "Must Enter value greater than 0"],
    max: 1000,
  },

  // these fields are if the exercise type is resistance
  weight: {
    type: Number
  },
  sets: {
    type: Number
  },
  reps: {
    type: Number
  },
  duration: {
    type: Number
  }
})


// make validation so the right fields are filled out according to if cardio or resistance is chosen

const Exercise = mongoose.model("Exercise", ExerciseSchema);



module.exports = Exercise
