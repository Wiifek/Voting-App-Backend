const UserSchema = require('../models/userSchema');
const PollSchema = require('../models/pollSchema');

//Get all polls
exports.getAllPolls = async (req, res) => {
    try {
        const polls = await PollSchema.find({})
        res.json(polls);
    }
    catch (err) {
        console.log(err)
        res.status(500).json({message : "Internal server error!"});
    }
}

//Add poll
exports.addPoll = async(req,res)=>{
    try {
        const pollData = req.body;
        const uid = req.params.uid;
        const createdPoll = await PollSchema.create(pollData);
        await UserSchema.findByIdAndUpdate(uid, { $push: { pollsTopics: createdPoll._id } }, { new: true });
        res.json(createdPoll);
    }
    catch (err) {
        console.log(err)
        res.status(500).json({message : "Internal server error!"});
    }
}

//Get poll by id
exports.getPollById = async (req, res) => {
    try {
        const id = req.params.id;
        const poll = await PollSchema.findById(id);
        if (poll) {
            res.json(poll);
        } else {
            res.status(404).json({ message: 'Poll not foud!' })
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({message : "Internal server error!"});
    }
}

//Edit existant poll
exports.editPoll = async (req, res) => {
    try {
        const pollData = req.body;
        const id = req.params.id;
        const poll = await PollSchema.findById(id);
        if (!poll)
            res.status(404).json({ message: "This poll does not exist!" });
        else {
            const updatedPoll = await PollSchema.findByIdAndUpdate(id, pollData, { new: true });
            res.json(updatedPoll)
            
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({message : "Internal server error!"});
    }
}

//Delete poll
exports.deletePoll = async (req, res) => {
    try {
        const pollId = req.params.pollId;
        const poll = await PollSchema.findById(pollId);

        if (!user)
            res.json({ message: "This poll does not exist!" })
        else {
            await UserSchema.findByIdAndUpdate(poll.user.valueOf(), { $pull: { pollsTopics: poll._id } }, { new: true });
            await PollSchema.findByIdAndRemove(pollId);
            res.json({ message: "Poll with id " + id + " has been deleted successfuly" })
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({message : "Internal server error!"});
    }
}

//Show poll voters
exports.showPollVoters = async (req, res) => {
    try {
        const id = req.params.pollId;
        const poll = await PollSchema.findById(id);

        if (!poll)
            res.json({ message: "Poll does not exist!" })
        else {
            const pollWithVoters = await PollSchema.findById(id).populate('voted');
            res.json(pollWithVoters.voted)
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({message : "Internal server error!"});
    }
}