import { connect, disconnect } from "mongoose";

export const connectToDatabase = async () => {
  try {
    await connect(process.env.MONGODB_URL);
  } catch (err) {
    console.log(err);
    throw new Error("Cannot Connect To MongoDB");
  }
};

export const disconnectFromDatabase = async () => {
  try {
    await disconnect();
  } catch (err) {
    console.log(err);
    throw new Error("Cannot Disconnect From MongoDB");
  }
};
