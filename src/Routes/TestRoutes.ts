import express from "express";
import {
  VerifyUser,
  createUser,
  deleteAllModel,
} from "../controller/testController";

const router = express.Router();

router.route("createuser").post(createUser);
router.route("/deleteallmodel").delete(deleteAllModel);
router.route("/verifyuser/:userID").patch(VerifyUser);

export default router;
