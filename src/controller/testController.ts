import testModel from "../model/testModel";
import { Request, Response } from "express";
import crypto from "crypto";
import { verifyAccount } from "../Email/Email";
//create user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const token = await crypto.randomBytes(32).toString("hex");
    const OTP = await crypto.randomBytes(2).toString("hex");
    console.log("OTP:", OTP);
    console.log("TOKEN:", token);
    const user = await testModel.create({
      name,
      email,
      password,
      token,
      OTP,
    });
    verifyAccount(user)
      .then(() => {
        console.log("Email sent");
      })
      .catch((err) => {
        console.log("An error occured", err);
      });
    return res.status(201).json({
      message: "new user created and email sent successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "couldn't create user",
      data: error,
    });
  }
};

export const deleteAllModel = async (req: Request, res: Response) => {
  const deleteAllModel = await testModel.deleteMany();
  return res.status(200).json({
    message: "Deleted All User " + (await testModel.find()).length,
  });
};

export const VerifyUser = async (req: Request, res: Response) => {
  try {
    const { OTP } = req.body;
    const { userID } = req.params;

    const user = await testModel.findById(userID);

    if (user?.OTP === OTP && user?.token !== "") {
      const verify = await testModel.findByIdAndUpdate(
        user?._id,
        {
          token: "",
          isVerified: true,
        },
        { new: true }
      );

      return res.status(200).json({
        message: "Succesfully verified user",
        data: verify,
      });
    } else {
      return res.status(400).json({
        message: "Wrong OTP",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "An error occured in verifying user",
      data: error,
    });
  }
};
