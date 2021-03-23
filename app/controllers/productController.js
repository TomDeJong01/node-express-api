import dbQuery from '../db/dev/dbQuery';
import {errorMessage, successMessage, status } from '../helpers/status';
import jwt from "jsonwebtoken";
var multer  = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const getAllProducts = async (req, res) => {
  const query = `SELECT * FROM product`;
  try{
    const { rows } = await dbQuery.query(query);
    successMessage.data = rows;
    return res.send(successMessage);
  } catch (e) {
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
  errorMessage.error = 'Operation was not successful';
  return res.status(status.error).send(errorMessage);
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

const addProduct = async (req, res) => {
  console.log("in addProduct")
  const newProduct = req.body;
  const { is_admin } = req.user;
  console.log(newProduct);

  if (!is_admin === true) {
    errorMessage.error = 'You are unauthorized for this action';
    return res.status(status.unauthorized).send(errorMessage);
  }
  newProduct.alcoholpercentage = newProduct.alcoholpercentage === undefined ? null : newProduct.alcoholpercentage;
  newProduct.fermentation = newProduct.fermentation === undefined ? null : newProduct.fermentation;
  const query = 'INSERT INTO product (name, category, price, brewery, imgurl, alcoholpercentage, fermentation) ' +
      'VALUES (\''+newProduct.name+'\', \''+newProduct.category+'\', '+newProduct.price+', \''+newProduct.brewery+'\', ' +
      '\''+newProduct.imgurl+'\', '+newProduct.alcoholpercentage+', '+newProduct.fermentation+')'
  try{
    console.log(query);
    const { rows } = await dbQuery.query(query);
    successMessage.data = rows[0];
    return res.send(successMessage)
  }catch (e) {
    console.log(e);
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
}

const updateProduct = async (req, res) => {
  const newProduct = req.body;
  const { is_admin } = req.user;
  if (!is_admin === true) {
    errorMessage.error = 'You are unauthorized for this action';
    return res.status(status.unauthorized).send(errorMessage);
  }
  const query = 'UPDATE product p ' +
      'SET name = \''+newProduct.name+'\', ' +
      'category = \''+newProduct.category+'\', ' +
      'price = '+newProduct.price+', ' +
      'brewery = \''+newProduct.brewery+'\', ' +
      'imgurl = \''+newProduct.imgurl+'\', ' +
      'alcoholpercentage = '+newProduct.alcoholpercentage+', ' +
      'fermentation = '+newProduct.fermentation+' ' +
      'WHERE id = '+newProduct.id+' returning * '

  try{
    const { rows } = await dbQuery.query(query);
    successMessage.data = rows[0];
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
    updateProduct,
    addProduct,
};
