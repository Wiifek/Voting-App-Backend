const express = require('express')
const router = express.Router()
const uc = require('../controllers/userController')
const passport = require('passport')


//Get all users
router.get("/", passport.authenticate('bearer', { session: false }), uc.getAllUsers)

//Get user by id
router.get("/:id", passport.authenticate('bearer', { session: false }), uc.getUserById)

//Edit existant user
router.put("/edit-user/:uid", passport.authenticate('bearer', { session: false }), uc.editUser)

//Delete user
router.delete("/delete-user/:uid", passport.authenticate('bearer', { session: false }), uc.deleteUser)

//show created polls
router.get("/show-created-polls/:uid", passport.authenticate('bearer', { session: false }), uc.showUserCreatedPolls)

//cancel vote
router.delete("/cancel-vote/:uid/:pollId", passport.authenticate('bearer', { session: false }), uc.cancelVote)

//vote
router.post("/vote-poll/:uid/:pollId", passport.authenticate('bearer', { session: false }), uc.votePoll)


module.exports = router