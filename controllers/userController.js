const UserSchema = require("../models/userSchema");
const PollSchema = require('../models/pollSchema');

//Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserSchema.find({})
        res.json(users);
    } catch (err) {
        console.log(err)
        res.status(500).json({message : "Internal server error!"});
    }
}

//Get user by id
exports.getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserSchema.findById(id)
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not foud!' })
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({message : "Internal server error!"});
    }
}

//Edit existant user
exports.editUser = async (req, res) => {
    try {
        const userData = req.body;
        const id = req.params.uid;
        const user = await UserSchema.findById(id);
        if (!user)
            res.status(404).json({ message: "This user does not exist!" });
        else {
            const updatedUser = await UserSchema.findByIdAndUpdate(id, userData, { new: true });
            res.json(updatedUser)
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({message : "Internal server error!"});
    }
}

//Delete user
exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.uid;
        const user = await UserSchema.findById(id);
        if (!user)
            res.status(404).json({ message: "This user does not exist!" });
        else {

            await UserSchema.findByIdAndRemove(id);
            res.json({ message: "User with id " + id + " has been deleted successfuly" })
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({message : "Internal server error!"});
    }
}

//cancel vote
exports.cancelVote = async (req, res) => {
    try {
        const id = req.params.uid;
        const pollId = req.params.pollId;
        const poll = await PollSchema.findById(pollId);
        const user = await UserSchema.findById(id);

        if (!user)
            res.json({ message: "User does not exist!" })
        else if (!poll)
            res.json({ message: "This poll does not exist!" })
        else {
            const updatedUser = await UserSchema.findByIdAndUpdate(id, { $pull: { pollsVoted: poll._id } }, { new: true });
            res.json(updatedUser)
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({message : "Internal server error!"});
    }
}


//Show all created polls
exports.showUserCreatedPolls = async (req, res) => {
    try {
        const id = req.params.uid;
        const user = await UserSchema.findById(id);

        if (!user)
            res.json({ message: "User does not exist!" })
        else {
            const userWithPolls = await UserSchema.findById(id).populate('pollsTopics');
            res.json(userWithPolls.pollsTopics)
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({message : "Internal server error!"});
    }
}
