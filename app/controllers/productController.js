import dbQuery from '../db/dev/dbQuery';
import {errorMessage, successMessage, status } from '../helpers/status';


const getAllProducts = async (req, res) => {
  console.log('getAllProducts')
  const query = `SELECT p.id, p.category_id, p.name, p.price, p.brewery, p.img, pc.category FROM product p LEFT JOIN product_category pc ON p.category_id = pc.id`;
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

  if (Number(product_id) < 1) {
    errorMessage.bad = 'bad request, no product id'
    return res.status(status.bad).send(errorMessage);
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

const getActiveCategories = async (req, res) => {
  console.log("getActiveCategories")
  const query = `SELECT DISTINCT(p.category_id), pc.category FROM product p LEFT JOIN product_category pc ON p.category_id = pc.id ORDER BY category;`
  try{
    const { rows } = await dbQuery.query(query);
    successMessage.data = rows;
    return res.send(successMessage)
  }catch (e) {
    console.log(e);
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
}

const getAllCategories = async (req, res) => {
  const query = 'SELECT category FROM product_category;'
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
  newProduct.img = newProduct.img === undefined ? null : newProduct.img;
  const query = 'INSERT INTO product (name, category, price, brewery, img, alcoholpercentage, fermentation) ' +
      'VALUES (\''+newProduct.name+'\', \''+newProduct.category+'\', '+newProduct.price+', \''+newProduct.brewery+'\', ' +
      '\''+newProduct.img+'\', '+newProduct.alcoholpercentage+', '+newProduct.fermentation+')'
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
      'img = \''+newProduct.img+'\', ' +
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

const deleteProduct = async (req, res) => {
  const product_id = req.params.id;
  const { is_admin } =req.user;
  const query = 'DELETE FROM product WHERE id = $1 ;'
  const values = [product_id]

  if (!is_admin) {
    errorMessage.error = 'You are unauthorized for this action';
    return res.status(status.unauthorized).send(errorMessage);
  }

  try{
    const { rows } = await dbQuery.query(query, values);
    return res.send(successMessage)
  }catch (e) {
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }



}


export {
    getAllProducts,
    getProduct,
    getActiveCategories,
    getAllCategories,
    updateProduct,
    addProduct,
    deleteProduct
};
