import express from "express"
import { Router } from "express"

import {
  getRecipe,addRecipe,getRecipes
} from "../controllers/recipeController.js"

const recipeRouter=Router();

recipeRouter.route('/add-recipe').post(addRecipe)
recipeRouter.route('/get-recipe').get(getRecipe)
recipeRouter.route('/get-recipies').get(getRecipes)

export {recipeRouter}


