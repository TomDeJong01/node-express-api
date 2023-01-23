import dbQuery from '../db/dev/dbQuery';
import {errorMessage, successMessage, status } from '../helpers/status';


const getAllProducts = async (req, res) => {
  const query = `SELECT p.id, p.category_id, p.name, p.price, p.brewery, p.img, pc.category FROM product p RIGHT JOIN product_category pc ON p.category_id = pc.id WHERE p.id NOTNULL`;
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

  const query = 'SELECT p.id, p.category_id, p.name, p.price, p.brewery, p.img, pc.category FROM product p LEFT JOIN product_category pc ON p.category_id = pc.id WHERE p.id = $1;';
  const values = [product_id];

  try{
    const { rows } = await dbQuery.query(query, values);
    successMessage.data = rows[0];
    return res.send(successMessage)
  }catch (e) {
    console.log(e);
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

  newProduct.img = newProduct.img === undefined ? null : newProduct.img;
  const query = `INSERT INTO product(name, category_id, price, brewery, img) VALUES($1, $2, $3, $4, $5);`
  const values = [newProduct.name, newProduct.category_id, newProduct.price, newProduct.brewery, newProduct.img]
  try{
    const { rows } = await dbQuery.query(query, values);
    successMessage.data = rows[0];
    return res.send(successMessage)
  }catch (e) {
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
}

const updateProduct = async (req, res) => {
  const product = req.body;
  const { is_admin } = req.user;
  if (!is_admin) {
    errorMessage.error = 'You are unauthorized for this action';
    return res.status(status.unauthorized).send(errorMessage);
  }

  const query = `UPDATE product p SET name = $1, category_id = $2, price = $3, brewery = $4, img = $5
    WHERE id = $6;`
  const values = [product.name, product.category_id, product.price, product.brewery, product.img, product.id]

  try{
    const { rows } = await dbQuery.query(query, values);
    console.log(rows[0])
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
    updateProduct,
    addProduct,
    deleteProduct,
};
