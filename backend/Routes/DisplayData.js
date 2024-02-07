import express from "express";
import { Router } from "express";

const displayDataRouter = Router();

displayDataRouter.post('/foodData', (req, res) => {
    try {
        console.log('Retrieved data:', [global.food_items, global.foodcategory]);
        res.status(200).json({ success: true, data: [global.food_items, global.foodcategory] });
    } catch (error) {
        console.error('Error retrieving data:', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});


export default displayDataRouter; 
