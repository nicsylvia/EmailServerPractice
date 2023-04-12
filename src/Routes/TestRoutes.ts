import express from "express";
import { createUser, deleteAllModel } from "../controller/testController";

const router = express.Router();

router.route("/verifyuser").post(createUser);
router.route("/deleteallmodel").delete(deleteAllModel);
export default router;
