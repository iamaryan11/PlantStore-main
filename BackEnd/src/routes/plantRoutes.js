const express=require('express');
const {getAllPlants}=require('../controllers/adminCrud');
const validatePlant=require('../middleware/plantvaldation');
const allPlantsroute=express.Router();

allPlantsroute.get('/plants',getAllPlants);
module.exports={allPlantsroute};