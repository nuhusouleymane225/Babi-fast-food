import express from 'express';

const router = express.Router();

router.get('/api/v1', (request, response) => response.status(200)
  .json({
    message: 'Welcome to Fast-Food-Fast'
  }));

router.all('*', (request, response) => response.status(404)
  .json({
    message: 'oooop! This page does not exist'
  }));

export default router;
