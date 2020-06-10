import * as mongoose from 'mongoose';

// Create the schema for user's steam profile details
const userSteamDetailsSchema = new mongoose.Schema({
    steam_name: { type: String, required: true },
    steam_avatar_url: { type: String, required: true}
});

// Create the `user` model for the above schema
const userSteamDetails = mongoose.model('User', userSteamDetailsSchema);

export default userSteamDetails;