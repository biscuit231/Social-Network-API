const { Schema, model } = require("mongoose");
const reactionSchema = require('./Reaction');
const moment = require('moment');

const ThoughtSchema = new Schema(
{
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: timeStamp => moment(timeStamp).format('DD/ MM/ YY [at] H:mm')
    },

    username: {
        type: String,
        required: true,
    },

    reactions: [reactionSchema],
},
{
    toJSON: {
        getters: true,
        virtuals: true,
    }
}
);

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;