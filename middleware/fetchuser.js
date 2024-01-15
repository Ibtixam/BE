import jwt from "jsonwebtoken";

const fetchUser = (req, res, next) => {
  const authToken = req.header("auth-token");
  if (!authToken) {
    res.status(401).send("Please send a valid token");
  }
  try {
    const data = jwt.verify(authToken, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send("Please send a valid token");
  }
};

export default fetchUser;
