import dbQuery from '../db/dev/dbQuery';
import {errorMessage, successMessage, status } from '../helpers/status';
import jwt from "jsonwebtoken";

const getAllProducts = async (req, res) => {
  const query = `SELECT * FROM product`;
  try{
    const { rows } = await dbQuery.query(query);
    successMessage.data = rows;
  } catch (e) {
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
  return res.send(successMessage);
}

const getProduct = async (req, res) => {
  const product_id = req.params.id;
  const query = ' SELECT * FROM product WHERE id = ' + product_id
  try{
    const { rows } = await dbQuery.query(query);
    successMessage.data = rows[0];
    return res.send(successMessage)
  }catch (e) {
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
}

const getCategories = async (req, res) => {
  const query = 'SELECT DISTINCT category FROM product'
  try{
    const { rows } = await dbQuery.query(query);
    successMessage.data = rows;
    return res.send(successMessage)
  }catch (e) {
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
}

export {
    getAllProducts,
    getProduct,
    getCategories,
};
