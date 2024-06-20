import {Recipe} from "../models/recipe.js";
import { ApiError } from "../utilities/ApiError.js";
import { ApiResponse } from "../utilities/ApiResponse.js"
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utilities/Cloudinary.js";
// Add a new recipe
const addRecipe = async (req, res) => {
  const {
    title,
    description,
    ingredients,
    instructions,
    cookingTime,
    difficulty,
    cuisineType,
    dietaryRestrictions,
    authorId,
  } = req.body;

  if (
    [ title,
      description,
      ingredients,
      instructions].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "Title Description ingredients and Instructions are required");
  }


  // const imageLocalPath = req.files?.imageUrl[0].path;

  // if (!imageLocalPath) {
  //   throw new ApiError(400, "Recipe image LocalPath  is required");
  // }
  // const recipeimage = await uploadOnCloudinary(imageLocalPath);

  // const videoLocalPath = req.files?.videoUrl[0].path;

  // if (!videoLocalPath) {
  //   throw new ApiError(400, "Recipe video LocalPath  is required");
  // }
  // const recipeVideo = await uploadOnCloudinary(videoLocalPath);

  try {
    const recipe = await  Recipe.create({
      title,
      description,
      ingredients,
      instructions,
      cookingTime,
      difficulty,
      cuisineType,
      dietaryRestrictions,
      author: authorId,
      // imageUrl:recipeimage.url,
      // videoUrl:recipeVideo.url
      imageUrl,
      videoUrl
    });
   

    res.status(201).json(
      ApiResponse(200,{recipe},"Recipe Uploaded Successfully")
    );
  } catch (error) {
    res.status(500).json(
      new ApiError(400, "Unable to upload the Recipe"));
  }
};

// Get all recipes
const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate(
      "author",
      "username profilePicture"
    );
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single recipe
const getRecipe = async (req, res) => {
  const { recipeId } = req.params;

  try {
    const recipe = await Recipe.findById(recipeId)
      .populate("author", "username profilePicture")
      .populate("comments")
      .populate("likes");
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {addRecipe,
  getRecipe,getRecipes
}