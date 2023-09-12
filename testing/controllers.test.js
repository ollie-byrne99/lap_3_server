const request = require('supertest');
const app = require('../app') // Replace with the actual import for your Express app
const Goal = require('../models/Goal'); // Replace with the actual import for your Goal model

    describe('GET /goals', () => {
        it('should return a list of goals with a 200 status code', async () => {
          // Mock the getAll method of the Goal model to return sample data
          jest.spyOn(Goal, 'getAll').mockResolvedValue([
         
