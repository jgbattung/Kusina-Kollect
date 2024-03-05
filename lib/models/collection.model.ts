import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipes: [{
    type: mongoose.Types.ObjectId,
    ref: 'Recipe'
  }],
  isPublic: {
    type: Boolean,
    required: true
  },
});

const Collection = mongoose.models.Collection || mongoose.model('Collection', collectionSchema);

export default Collection;