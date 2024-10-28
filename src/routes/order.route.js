import { Router } from "express";
import { createOrder } from "../controllers/orderCreate.controller.js";

export const orderHandlerRouter = Router();

orderHandlerRouter.route('/create-order').post(createOrder)