const express = require("express");
const db = require('../models');

const router = express.Router();


router.route("/api/workouts")
  //GET: return all the workouts
  .get((req,res) => {
    db.Workout.find({}).populate("exercises").exec(function(err, docs) {
      if (err) {
        console.log(err);
      } else {
        res.json(docs);
      }
    })
  })
    
  

  // POST: post a single workout to database
  .post((req,res) => {
    db.Workout.create({}, function(err, doc) {
      if (err) {
        console.log(err);
      } else {
        res.json(doc);
      }
    })
  })


router.put('/api/workouts/:id', async (req,res) => {
  const workoutID = req.params.id;
  let {name, distance, duration, weight, sets, reps, type} = req.body;

  if (type === "cardio") {
    try {
      let msg = await handleCardioUpdate(type, name, distance, duration, workoutID);
      return res.json(msg);
    } catch (error) {
      console.log(error);
      return;
    } 
  } else if (type === "resistance") {
    try {
      let msg = await handleResistanceUpdate(type, name, weight, sets, reps, duration, workoutID);
      return res.json(msg);
    } catch (error) {
      console.log(error);
      return;
    } 
  }
})





router.get("/api/workouts/range", (req,res) => {
  let endDate = new Date();

  // example of finding items between date
  db.Workout.find({day: {$lte : endDate} }).populate("exercises").exec(function(err, docs) {
    if (err) {
      throw err;
    } else {
      res.json(docs);
    }
  })
})


// export router
module.exports = router;




// helper functions


// check if any of the elements are undefined or null
function containsNull(arr) {
  arr.forEach(element => {
    // this is equivalent to if null or undefined
    if (element == null) {
      return true;
    }
  });

  return false;
}

// create cardio exercise and add to workout collection
function handleCardioUpdate(type, name, distance, duration, workoutID) {
  return new Promise((resolve,reject) => {
    let exercise_id;

    if (containsNull([name, distance, duration])) {
      return reject("field contains null value");
    }

    db.Exercise.create({type: type, name: name, distance: distance, duration: duration}, function(err, doc) {
      if (err) {
        return reject(err);
      } else {
        console.log(doc);
        exercise_id = doc._id;
        db.Workout.updateOne({_id: workoutID}, {$push: {exercises: exercise_id}, $inc: {totalDuration: duration}}, function(err, res) {
          if (err) {
            return reject("Could not update Workout Collection");
          }
          return resolve("Added Exercise Successfully");
        });
      }
    });
  })
}


// create resistance exercise and add to workout collection
function handleResistanceUpdate(type, name, weight, sets, reps, duration, workoutID) {
  return new Promise((resolve,reject) => {
    let exercise_id;

    if (containsNull([name, weight, sets, reps, duration])) {
      return reject("field contains null value");
    }

    db.Exercise.create({type: type, name: name, weight: weight, sets: sets, reps: reps, duration: duration}, function(err, doc) {
      if (err) {
        return reject(err);
      } else {
        console.log(doc);
        exercise_id = doc._id;
        db.Workout.updateOne({_id: workoutID}, {$push: {exercises: exercise_id}, $inc: {totalDuration: duration}}, function(err, res) {
          if (err) {
            return reject("Could not update Workout Collection");
          }
          return resolve("Added Exercise Successfully");
        });
      }
    });
  })
}