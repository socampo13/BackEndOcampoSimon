import mongoose from 'mongoose';

const messagesCollection = 'messages';

const MessagesSchema = new mongoose.Schema({
    email: {type: String, required: true, max: 64},
    message: {type: String, required: true, min: 1},
    timestamp: {type: Date, default: Date.now()}
});

export const messages = mongoose.model(messagesCollection, MessagesSchema);