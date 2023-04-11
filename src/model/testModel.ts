import mongoose from "mongoose";

interface user {
  name: string;
  email: string;
  password: string;
  token: string;
  OTP: string;
  isVerified: boolean;
}

interface Iuser extends user, mongoose.Document {}

const testSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  token: {
    type: String,
  },
  OTP: {
    type: String,
  },
});

const testModel = mongoose.model<Iuser>("testAuth", testSchema);

export default testModel;
