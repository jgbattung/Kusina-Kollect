import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { 
    type: String, required: true 
  },
  username: {
    type: String, required: true, unique: true
  },
  name: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  savedRecipes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe'
  }],
  collections: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collection'
  }],
  isContributor: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  onboarded: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;