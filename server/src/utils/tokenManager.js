import jwt from "jsonwebtoken";

export const createToken = (id, username, expiresIn) => {
  const payload = { id, username };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });
  return token;
};

export const verifyToken = async (req, res, next) => {
  const token = req.signedCookies["auth_token"];
  if (!token || token.trim() === "")
    return res.status(401).json({ message: "Token not recieved" });
  return new Promise((resolve, reject) => {
    return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
      if (err) {
        reject(err.message);
        return res.status(401).json({ message: "Token Expired" });
      } else {
        console.log("Token verified");
        resolve();
        res.locals.jwtData = success;
        return next();
      }
    });
  });
};
