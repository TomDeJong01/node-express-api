import dbQuery from '../db/dev/dbQuery';
import {errorMessage, successMessage, status } from '../helpers/status';

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
}

const getProduct = async (req, res) => {
  const product_id = req.params.id;
  const { is_admin } = req.user;

  if(!is_admin) {
    errorMessage.error = 'You are unauthorized for this action';
    return res.status(status.unauthorized).send(errorMessage);
  }

  if (!Number.isInteger(product_id)) {
    errorMessage.bad = 'bad request, no product id'
    return res.status(status.unauthorized).send(errorMessage);
  }

  const query = ' SELECT * FROM product WHERE id = $1;';
  const values = [product_id];

  try{
    const { rows } = await dbQuery.query(query, values);
    successMessage.data = rows[0];
    return res.send(successMessage)
  }catch (e) {
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
}

const getCategories = async (req, res) => {
  const query = 'SELECT DISTINCT category FROM product ORDER BY category'
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
  const newProduct = req.body;
  const { is_admin } = req.user;

  if (!is_admin) {
    errorMessage.error = 'You are unauthorized for this action';
    return res.status(status.unauthorized).send(errorMessage);
  }
  newProduct.alcoholpercentage = newProduct.alcoholpercentage === undefined ? null : newProduct.alcoholpercentage;
  newProduct.fermentation = newProduct.fermentation === undefined ? null : newProduct.fermentation;
  newProduct.imgurl = newProduct.imgurl === undefined ? null : newProduct.imgurl;
  const query = 'INSERT INTO product (name, category, price, brewery, imgurl, alcoholpercentage, fermentation) ' +
      'VALUES (\''+newProduct.name+'\', \''+newProduct.category+'\', '+newProduct.price+', \''+newProduct.brewery+'\', ' +
      '\''+newProduct.imgurl+'\', '+newProduct.alcoholpercentage+', '+newProduct.fermentation+')'
  try{
    const { rows } = await dbQuery.query(query);
    successMessage.data = rows[0];
    return res.send(successMessage)
  }catch (e) {
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
}

const updateProduct = async (req, res) => {
  const newProduct = req.body;
  const { is_admin } = req.user;
  if (!is_admin) {
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
