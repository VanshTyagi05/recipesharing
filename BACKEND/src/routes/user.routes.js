import express, { Router } from "express" 

import {
  registerUser,
  loginUser,
  updateUserProfile,
  followUser,
  unfollowUser,
  getUserProfile
}from '../controllers/userController.js';

const router =Router();
// Register a new user

router.post('/register', registerUser);

// Login a user
router.route('/login').post(loginUser);

// Get user profile
router.get('/users/:userId', getUserProfile);

// Update user profile
router.put('/users/:userId', updateUserProfile);

// Follow a user
router.post('/users/:userId/follow/:followId', followUser);

// Unfollow a user
router.post('/users/:userId/unfollow/:unfollowId', unfollowUser);

export  {router}
