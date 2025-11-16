const express=require('express');
const adminRight=express.Router();
const {plantsCreate,plantsDeletebyid,plantsDeletebyname}=require('../controllers/adminCrud')
const validatePlant=require('../middleware/plantvaldation')
const adminMiddleware=require('../middleware/adminMiddleware');
adminRight.post('/addplants',validatePlant,adminMiddleware,plantsCreate);
adminRight.delete('/deleteplantsbyid',adminMiddleware,plantsDeletebyid);
adminRight.delete('/deleteplantsbyname',adminMiddleware,plantsDeletebyname);



module.exports=adminRight;