const express = require("express");
const db = require('../models');

const router = express.Router();


router.route("/api/workouts")
  //GET: return all the workouts
  .get((req,res) => {
    db.Workout.find({}, function(err, docs) {
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


router.put('/api/workouts/:id', (req,res) => {
  const id = req.params.id;
  let {name, distance, duration, weight, sets, reps, duration, type} = req.body;

  if (type === "cardio") {
    if (containsNull([name, distance, duration])) {
      return;
    } else {
      // do your update
    }
  } else if (type === "resistance") {
    if (containsNull([name, weight, sets, reps, duration])) {
      return;
    } else {
      // do your update
    }
  }

})

  // PUT: modify the workout with the param :id
  .put((req, res) => {
    const {id} = req.params;
    res.json({});
  })




router.get("/api/workouts/range", (req,res) => {
  res.json({});
})



module.exports = router;


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