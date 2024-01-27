import { Router } from "express";
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UserModel from '../models/User.js';

const router = Router();

const jwtSecret = process.env.JWT_SECRET;

router.post("/createUser",
    [
        body('name', 'Length should be more than 5 characters long').isLength({ min: 5 }),
        body('password', 'Incorrect Password').isLength({ min: 5 }),
        body('email').isEmail(),
        body('location').notEmpty(),
    ],
    async (req, res) => {
        const result = validationResult(req);

        if (result.isEmpty()) {
            try {
                const salt = await bcrypt.genSalt(10);

                const hashedPassword = await bcrypt.hash(req.body.password, salt);

                const newUser = await UserModel.create({
                    name: req.body.name,
                    password: hashedPassword,
                    email: req.body.email,
                    location: req.body.location,
                });

                res.status(201).json({ success: true, message: "User created successfully" });

            } catch (error) {

                console.error('Error creating user:', error);

                res.status(500).json({ success: false, message: "Internal server error" });
            }
        } else {

            res.status(400).json({ success: false, errors: result.array() });
        }
    });


router.post("/loginUser",
    [
        body('email').isEmail(),
        body('password', 'Incorrect Password').isLength({ min: 5 }),
    ],
    async (req, res) => {

        const result = validationResult(req);
        if (!result.isEmpty()) {

            return res.status(400).json({ success: false, errors: result.array() });
        }

        const email = req.body.email;

        try {
            const userData = await UserModel.findOne({ email });

            if (!userData) {

                return res.status(400).json({ success: false, message: "Invalid credentials" });
            }

            const password_Compare = await bcrypt.compare(req.body.password, userData.password)
            if (!password_Compare) {

                return res.status(400).json({ success: false, message: "Invalid credentials" });
            }

            const data = {
                user: {
                    id: userData.id,
                }
            }

            const authToken = jwt.sign(data, jwtSecret)
            return res.json({ success: true, message: "Login successful", authToken: authToken });

        } catch (error) {
            console.error(error);

            res.status(500).json({ success: false, message: "Internal server error" });
        }
    });

export default router;
