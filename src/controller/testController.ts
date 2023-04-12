import testModel from "../model/testModel";
import { Request, Response } from "express";
import crypto from "crypto";
import { resetUserPassword, verifyAccount } from "../Email/Email";
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

// Verify user:
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

// Request and Reset password:
export const ResetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const getUser = await testModel.findOne({ email });
    const token = crypto.randomBytes(32).toString("hex");

    if (getUser?.isVerified === true && getUser?.token === "") {
      await testModel.findByIdAndUpdate(
        getUser?._id,
        {
          token: token,
        },
        { new: true }
      );

      resetUserPassword(getUser)
        .then(() => {
          console.log("Request granted");
        })
        .catch((err) => {
          console.log("An error occured", err);
        });
      return res.status(200).json({
        message: "Updated token successfully",
      });
    } else {
      return res.status(400).json({
        message: "Couldn't send email",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "An error occured in reseting password",
      data: error,
    });
  }
};
