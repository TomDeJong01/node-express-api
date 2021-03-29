import dbQuery from '../db/dev/dbQuery';
import {errorMessage, status, successMessage} from '../helpers/status';
import jwt from "jsonwebtoken";

const getUserOrder = async (req, res) => {
    const { user_id } = req.user;
    const query = 'SELECT * FROM "order" WHERE user_id = $1 ORDER BY order_id;';
    const values = [user_id]
    try {
        const { rows } = await dbQuery.query(query, values);
        successMessage.data = rows;
    } catch (e) {
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }
    return res.send(successMessage);
}

const createOrder = async (req, res) => {
    const { user_id } = req.user;
    const orderProducts = req.body;
    if(orderProducts.length < 1) {
        errorMessage.error = 'Order has no products';
        return res.status(status.error).send(errorMessage);
    }
    const createOrderQuery = 'INSERT INTO "order" (user_id, order_status) VALUES ($1, $2) returning *;'
    const values = [user_id, "pending"]

    try {
        let { rows } = await dbQuery.query(createOrderQuery, values);
        const orderId = rows[0].order_id;
        const insertOrderProductsQuery = orderProductsInsertQuery(orderProducts, orderId)
        await dbQuery.query(insertOrderProductsQuery);
    } catch (e) {
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }
    return res.send(successMessage);
}
function orderProductsInsertQuery(orderProducts, orderId) {
    let query = "";
    orderProducts.forEach(orderItem => {
        if(orderItem.amount > 0) {
            query += 'INSERT INTO "order_product" (order_id, product_id, amount) VALUES ('+
                orderId+', '+orderItem.product.id+', '+orderItem.amount+');'
        }
    })
    return query;
}

export {
    getUserOrder,
    createOrder
};
