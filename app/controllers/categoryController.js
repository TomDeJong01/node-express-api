import dbQuery from "../db/dev/dbQuery";
import {errorMessage, status, successMessage} from "../helpers/status";

const getActiveCategories = async (req, res) => {
    console.log("getActiveCategories")
    const query = `SELECT DISTINCT(p.category_id), pc.category FROM product p LEFT JOIN product_category pc ON p.category_id = pc.id WHERE p.id NOTNULL;`
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
    const query = 'SELECT id, category FROM product_category;'
    try{
        const { rows } = await dbQuery.query(query);
        successMessage.data = rows;
        return res.send(successMessage)
    }catch (e) {
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }
}

const addCategory = async (req, res) => {
    const categoryName = req.body.categoryName;
    const { is_admin } = req.user;

    if (!is_admin) {
        errorMessage.error = 'You are unauthorized for this action';
        return res.status(status.unauthorized).send(errorMessage);
    }

    const query = `INSERT INTO product_category (category) VALUES ($1) RETURNING id;`
    const values = [categoryName];
    try {
        const {rows} = await dbQuery.query(query, values)
        successMessage.data = rows;
        return res.send(successMessage);
    } catch (e) {
        errorMessage.error = 'Could not add category';
        return res.status(status.error).send(errorMessage);
    }
}


export {
    getActiveCategories,
    getAllCategories,
    addCategory
};

