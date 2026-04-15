const express=require('express');
const router=express.Router();
const {getHealthStatus}=require('../controllers/healthcheck.controller')


router.get('/', getHealthStatus);

module.exports=router;