/* eslint-disable camelcase */
import moment from 'moment';

import dbQuery from '../db/dev/dbQuery';

import {
  hashPassword,
  comparePassword,
  isValidEmail,
  validatePassword,
  isValidZipcode,
  isEmpty,
  generateUserToken, empty,
} from '../helpers/validations';

import {
  errorMessage, successMessage, status,
} from '../helpers/status';
import jwt from "jsonwebtoken";

/**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
const createUser = async (req, res) => {
  const {email, password, zipcode, street, house_nr, place} = req.body;
  const created_on = moment(new Date());
  const decodedPassword = Buffer.from(password, 'base64').toString('binary')

  if (isEmpty(email) || isEmpty(decodedPassword) || isEmpty(zipcode) || isEmpty(street) || empty(house_nr) || isEmpty(place)) {
    errorMessage.error = 'Email, password, zipcode, street, house number and place  field cannot be empty';
    return res.status(status.bad).send(errorMessage);
  }
  if (!validatePassword(decodedPassword)) {
    errorMessage.error = 'password must be atleast 5 characters long'
    return res.status(status.bad).send(errorMessage);
  }
  if (!isValidEmail(email)) {
    errorMessage.error = 'Please enter a valid Email';
    return res.status(status.bad).send(errorMessage);
  }
  if (!isValidZipcode(zipcode.replace(' ', ''))) {
    errorMessage.error = 'Enter a valid zipcode';
    return res.status(status.bad).send(errorMessage);
  }
  if (!Number.isInteger(house_nr)) {
    errorMessage.error = "house number must be a number"
    return res.status(status.bad).send(errorMessage);
  }

  const hashedPassword = hashPassword(decodedPassword);
  const createUserQuery = `INSERT INTO
      users(email, password, zipcode, street, house_nr, place, created_on)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning *`;
  const values = [email, hashedPassword, zipcode, street, house_nr, place, created_on];
  try {
    const { rows } = await dbQuery.query(createUserQuery, values);
    const dbResponse = rows[0];
    delete dbResponse.password;
    successMessage.data = generateUserToken(dbResponse.email, dbResponse.id, dbResponse.is_admin);
    return res.status(status.created).send(successMessage);
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      errorMessage.error = 'User with that EMAIL already exist';
      return res.status(status.conflict).send(errorMessage);
    }
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};

/**
   * Signin
   * @param {object} req
   * @param {object} res
   */
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const decodedPassword = Buffer.from(password, 'base64').toString('binary')

  if (isEmpty(email) || isEmpty(password)) {
    errorMessage.error = 'Email or Password detail is missing';
    return res.status(status.bad).send(errorMessage);
  }
  if (!isValidEmail(email) || !validatePassword(decodedPassword)) {
    errorMessage.error = 'Please enter a valid Email or Password';
    return res.status(status.bad).send(errorMessage);
  }
  const signinUserQuery = 'SELECT * FROM users WHERE email = $1';
  try {
    const { rows } = await dbQuery.query(signinUserQuery, [email]);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.error = 'User with this email does not exist';
      return res.status(status.notfound).send(errorMessage);
    }
    if (!comparePassword(dbResponse.password, decodedPassword)) {
      errorMessage.error = 'The password you provided is incorrect';
      return res.status(status.bad).send(errorMessage);
    }
    const token = generateUserToken(dbResponse.email, dbResponse.id, dbResponse.is_admin);
    delete dbResponse.password;
    successMessage.data = token;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};

const validateToken = async(req, res) => {
  const { token} = req.headers;
  try {
    if(jwt.verify(token, process.env.SECRET)) {
      return res.status(status.success).send(successMessage);
    }
  } catch (e) {
    errorMessage.error = 'Token not valid';
    return res.status(status.error).send(errorMessage);
  }
  errorMessage.error = 'Token not valid';
  return res.status(status.error).send(errorMessage);
}

export {
  createUser,
  loginUser,
  validateToken,
};
