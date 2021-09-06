const express = require('express')
const router = express.Router()
const pc = require('../controllers/pollController')
const passport = require('passport')


//Get all polls
router.get("/", passport.authenticate('bearer', { session: false }), pc.getAllPolls)

//Add poll
router.post("/add-poll",passport.authenticate('bearer', { session: false }), pc.addPoll)

//Get poll by id
router.get("/:id", passport.authenticate('bearer', { session: false }), pc.getPollById)

//Edit existant poll
router.put("/edit-poll/:id", passport.authenticate('bearer', { session: false }), pc.editPoll)

//Delete poll
router.delete("/delete-poll/:pollIid", passport.authenticate('bearer', { session: false }), pc.deletePoll)

//show poll voters
router.get("/show-poll-voters/:pollId", passport.authenticate('bearer', { session: false },), pc.showPollVoters)


module.exports = router