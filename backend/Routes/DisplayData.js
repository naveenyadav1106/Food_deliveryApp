import express from "express";
import { Router } from "express";

const displayDataRouter = Router();

displayDataRouter.post('/foodData', (req, res) => {
    try {
        // console.log(global.food_items)
        res.send([global.food_items, global.foodcategory])
    } catch (error) {
        console.error(error.message);
        res.send("Server Error")
    }
});

export default displayDataRouter; 
