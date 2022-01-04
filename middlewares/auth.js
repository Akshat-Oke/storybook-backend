import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500; //otherwise it is google auth token
    let decodedData;
    let user;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test");
      // @ts-ignore
      req.userId = decodedData?.id;
      // @ts-ignore
      user = userModel.findOne({ email: decodedData.email });
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub; //sub is id for google's user id

      // @ts-ignore
      user = await userModel.findOne({ email: decodedData.email });
      if (!user) {
        // @ts-ignore
        user = await userModel.create({
          name: decodedData.name,
          google: true,
          email: decodedData.email,
          password: "dummy",
        });
      }
    }
    //  user = userModel.find({ email: decodedData.email });
    req.user = user;
    console.log("decoded data is", decodedData);
    next();
  } catch (error) {
    console.log(error);
    next();
    // res.status(500).send("failed");
  }
};
export default auth;
