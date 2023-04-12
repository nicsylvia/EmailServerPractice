import express from "express";
import {
  ResetPassword,
  VerifyUser,
  createUser,
  deleteAllModel,
} from "../controller/testController";

const router = express.Router();

router.route("/createuser").post(createUser);
router.route("/deleteallmodel").delete(deleteAllModel);
router.route("/verifyuser/:userID").patch(VerifyUser);
router.route("/resetpassword").post(ResetPassword);

export default router;
