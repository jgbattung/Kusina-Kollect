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
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
});

recipeSchema.pre('save', function (next) {
  const recipe = this;
  const ingredientTags = recipe.ingredients.map((ingredient) => ingredient.toLocaleLowerCase());
  recipe.tags = Array.from(new Set([...recipe.tags, ...ingredientTags]));
})

const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', recipeSchema);

export default Recipe;