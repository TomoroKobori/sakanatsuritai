import express = require('express');
import { Request, Response } from "express";
import * as passportConfig from "../../config/passport";

const router = express.Router();

router.get("/users", passportConfig.isAuthenticated, async (req: Request, res: Response) => {

});

export default router;
