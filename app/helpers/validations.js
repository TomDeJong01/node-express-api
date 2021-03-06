import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from '../../env';
/**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hashPassword = password => bcrypt.hashSync(password, salt);

/**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */
const comparePassword = (hashedPassword, password) => {
  return bcrypt.compareSync(password, hashedPassword);
};

/**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
const isValidEmail = (email) => {
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
};
/**
 * isValidZipcode helper method
 * @param {string} zipcode
 * @returns {Boolean} True or False
 */
const isValidZipcode = (zipcode) => {
  const regEx = /[0-9]{4}[A-Za-z]{2}/;
  return regEx.test(zipcode);
};

/**
   * validatePassword helper method
   * @param {string} password
   * @returns {Boolean} True or False
   */
const validatePassword = (password) => {
  return !(password.length <= 5 || password === '');
};
/**
   * isEmpty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */
const isEmpty = (input) => {
  if (input === undefined || input === '') {
    return true;
  }
  return !input.replace(/\s/g, '').length;

};

/**
   * empty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */
const empty = (input) => {
  if (input === undefined || input === '') {
    return true;
  }
};

/**
   * Generate Token
   * @param {string} id
   * @returns {string} token
   */
const generateUserToken = (email, id, is_admin) => {
  const token = jwt.sign({
    email,
    user_id: id,
    is_admin
  },
  env.secret, { expiresIn: '3d' });
  return token;
};

export {
  hashPassword,
  comparePassword,
  isValidEmail,
  isValidZipcode,
  validatePassword,
  isEmpty,
  empty,
  generateUserToken,
};
