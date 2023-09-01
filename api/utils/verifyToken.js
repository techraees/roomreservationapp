import jwt from "jsonwebtoken";
import { createError } from "./error.js";

// Verify Token
export const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated! NotFound"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) next(createError(403, "Invalid WrongToken"));
    req.user = user;
    next();
  });
};

// Verify User
export const verifyUser = async (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

// Verify Admin
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) next();
    else return next(createError(403, "You are not admin unAuthorized"));
  });
};
