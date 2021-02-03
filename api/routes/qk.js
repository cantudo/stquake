import express from 'express';
const router  = express.Router();

import quake from '../models/qk'

router.post('/new_earthquake', async(req, res) => {
    console.log('eyyyy');
    const body = req.body;
    try {
        const quakeDB = await quake.create(body);
        res.status(200).json(quakeDB);
    } catch (error) {
        return res.status(500).json({
            message: 'An error ocurred',
            error
        });
    }
});

module.exports = router;
