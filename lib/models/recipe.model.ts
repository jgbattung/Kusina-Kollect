import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ingredients: [{
    type: String,
    required: true
  }],
  directions: [{
    type: String,
    required: true
  }],
  images: [{
    type: String,
    default: []
  }],
  tags: [String],
  prepTime: {
    value: { type: Number, required: true, min: 0 },
    unit: { type: String, required: true, enum: ['mins', 'hours'] },
  },
  cookTime: {
    value: { type: Number, required: true, min: 0 },
    unit: { type: String, required: true, enum: ['mins', 'hours'] },
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isApproved: {
    type: Boolean,
    default: false,
  }
});

const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', recipeSchema);

export default Recipe;