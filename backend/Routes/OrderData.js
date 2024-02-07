import express from "express";
import { Router } from "express";
import Orders from '../models/Orders.js';

const OrderDataRouter = Router();


const setCookie = (res, token) => {
    res.cookie('yourCookieName', token, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 60 * 60
    });
};

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

            // Generate a token and set a cookie
            const authToken = generateAuthToken(existingOrder.email);
            setCookie(res, authToken);

            res.json({ success: true });
        } else {
            await Orders.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );

            // Generate a token and set a cookie
            const authToken = generateAuthToken(existingOrder.email);
            setCookie(res, authToken);

            res.json({ success: true });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

OrderDataRouter.post('/MyorderData', async (req, res) => {
    try {
        let mydata = await Orders.findOne({ 'email': req.body.email });

        // Check if the request includes credentials and set the SameSite attribute accordingly
        const sameSiteOption = req.headers.origin ? { sameSite: 'None', secure: true } : {};

        // Set the orderData in the response cookie
        if (mydata) {
            const authToken = generateAuthToken(req.body.email);
            res.cookie('orderData', JSON.stringify(mydata), { httpOnly: true, ...sameSiteOption });
        }

        res.json({ orderData: mydata });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

// Function to generate an authentication token
const generateAuthToken = (email) => {
    const data = { user: { email } };
    return jwt.sign(data, jwtSecret);
};

export default OrderDataRouter;
