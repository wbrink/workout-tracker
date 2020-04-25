const express = require("express");

const router = express.Router();


router.route("/api/workouts")
  //get route
  .get((req,res) => {
    // return all the workouts
    res.json({});
  })

  //post
  .post((req,res) => {
    // post single workout
    res.json({});
  })

  //put
  .put((req, res) => {
    // modify the workout with the param :id
    const {id} = req.params;
    res.json({});
  })




router.get("/api/workouts/range", (req,res) => {
  res.json({});
})



module.exports = router;