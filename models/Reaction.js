const { Schema, Types } = require('mongoose');
const moment = require('moment');

const ReactionSchema = new Schema(
{
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },

    reactionBody: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },

    username: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: timeStamp => moment(timeStamp).format('DD/ MM/ YY [at] H:mm')
    }
});

module.exports = ReactionSchema;