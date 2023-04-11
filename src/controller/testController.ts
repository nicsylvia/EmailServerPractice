import testModel from "../model/testModel";
import { Request, Response } from "express";
import crypto from "crypto";
//create user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, token, OTP } = req.body;
    const getToken = await crypto.randomBytes(32);
    const getOtp = await crypto.randomBytes(2);
    const user = await testModel.create({
      name,
      email,
      password,
      token: getToken,
      OTP: getOtp,
    });
    return res.status(201).json({
      message: "new user created and email sent successfully",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      message: "couldn't create user",
      data: error,
    });
  }
};

//verify user
