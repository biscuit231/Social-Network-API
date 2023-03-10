const { User, Thought } = require("../models");

const userController = {

getAllUser(req, res) {
    User.find({})
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then(userData => {
        if (!userData) {
          return res.status(400).json({ message: 'No user found with this id' });
        }
        res.json(userData);
      })
    .catch(err => {
        console.log(err)
        res.status(400).json(err);
    })
    },

getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then(userData => {
        if (!userData) {
          return res.status(400).json({ message: 'No user found with this id' });
        }
        res.json(userData);
      })
    .catch(err => {
        console.log(err)
        res.status(400).json(err);
    })
    },

createUser({ body }, res) {
    User.create(body)
      .then(userData => res.json(userData))
    .catch(err => {
        console.log(err)
        res.status(400).json(err);
    })
    },

updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
        new: true,
        runValidators: true,
    })
        .then(userData => {
            if (!userData) {
                return res.status(400).json({ message: 'No user found with this id' });
            }
        res.json(userData);
        })
    .catch(err => {
        console.log(err)
        res.status(400).json(err);
    })
    },

deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
        .then(userData => {
            if (!userData) {
                return res.status(400).json({ message: 'No user found with this id' });
            }
        return Thought.deleteMany({ _id: { $in: userData.thoughts } });
        })
        .then(() => {
            res.json({ message: 'User deleted' });
        })
    .catch(err => {
        console.log(err)
        res.status(400).json(err);
    })
    },

addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true }
    )
        .then(userData => {
            if (!userData) {
                return res.status(400).json({ message: 'No user found with this id' });
        }
        res.json(userData);
        })
    .catch(err => {
        console.log(err)
        res.status(400).json(err);
    })
    },

deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
        .then(userData => {
            if (!userData) {
                return res.status(400).json({ message: 'No user found with this id' });
        }
        res.json(userData);
        })
    .catch(err => {
        console.log(err)
        res.status(400).json(err);
    })
    }
};
module.exports = userController;