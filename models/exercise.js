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


// error handling middleware (only fires when error after save) This is made in case there is duplicate key error
ExerciseSchema.post("save", function (err,doc,next) {
  if (err.name === "MongoError" && err.code === 11000) {
    next(new Error("Name must be unique"));
  } else {
    next(err); // in case different error send this, or send null
  }
}); 


// example usage in creating documents
/*
var people = [{ name: 'Axl Rose' }, { name: 'Slash' }];
Person.create(people, function(error) {
  Person.update({ name: 'Slash' }, { $set: { name: 'Axl Rose' } }, function(error) {
    // `error.message` will be "There was a duplicate key error"
  });
});
*/


const Exercise = mongoose.model("Exercise", ExerciseSchema);





module.exports = Exercise
