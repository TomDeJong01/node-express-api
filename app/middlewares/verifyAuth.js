/* eslint-disable max-len */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { errorMessage, status, } from '../helpers/status';

import env from '../../env';

dotenv.config();

/**
 * Verify Token
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object|void} response object
 */
const isAdmin = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    errorMessage.error = 'Token not provided';
    return res.status(status.bad).send(errorMessage);
  }
  try {
    const decoded =  jwt.verify(token, process.env.SECRET);
    return decoded.is_admin
  } catch (error) {
    errorMessage.error = 'Not Authorized'
    return res.status(status.unauthorized).send(errorMessage);
  }
}

const verifyToken = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    errorMessage.error = 'Token not provided';
    return res.status(status.bad).send(errorMessage);
  }
  try {
    const decoded =  jwt.verify(token, process.env.SECRET);
    req.user = {
      email: decoded.email,
      user_id: decoded.user_id,
      is_admin: decoded.is_admin,
    };
    next();
  } catch (error) {
    errorMessage.error = 'Authentication Failed';
    return res.status(status.unauthorized).send(errorMessage);
  }
};


export {verifyToken, isAdmin};
