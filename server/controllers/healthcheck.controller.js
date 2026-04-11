const { uptime } = require('process');
const db=require('../db/db');
exports.getHealthStatus=async(_req, res)=>{
    const healthcheck={
        uptime:process.uptime(),
        server:{
            message:"ok",
            status: 'up'
        },
        db:{
            status: '',
            message: ''
        }
    };

    try{
        let conn;
        try{
            conn=await db.getConnection();
            await conn.query('SELECT 1 AS result');
            healthcheck.db={
                message: 'OK',
                status: 'up'
            };

        }finally{
            if(conn && conn.release)conn.release();
        }
        res.send(healthcheck);
    }catch(error){
        healthcheck.db={
            status:'down',
            message: 'Database connection failed',
            error: error.message
        }

        res.status(503).send(healthcheck);
    }
};