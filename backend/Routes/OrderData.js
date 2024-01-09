import express from "express";
import { Router } from "express";
import Orders from '../models/Orders.js';

const OrderDataRouter = Router();

OrderDataRouter.post('/orderData', async (req, res) => {
    try {
        const data = req.body.order_data;
        data.unshift({ Order_date: req.body.order_date });

        const existingOrder = await Orders.findOne({ 'email': req.body.email });

        if (!existingOrder) {
            await Orders.create({
                email: req.body.email,
                order_data: [data]
            });

            res.json({ success: true });
        } else {
            await Orders.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );

            res.json({ success: true });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

OrderDataRouter.post('/MyorderData', async (req, res) => {
    try {
        let mydata = await Orders.findOne({ 'email': req.body.email })
        res.json({ orderData: mydata })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
})

export default OrderDataRouter;
