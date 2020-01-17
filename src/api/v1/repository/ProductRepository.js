import db from '../../../db_config/config';

export const getProduct = val => {
    const createQuery = `SELECT * FROM products WHERE product_id = $1`;
    return db.query(createQuery, val);
}

export const getProducts = val => {
    const createQuery = `SELECT * FROM products WHERE user_id = $1`;
    return db.query(createQuery, val);
};

export const createProduct = (product) => {
    const createQuery = `INSERT INTO
      products(product_id, user_id, product_name, product_price, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6)
      `;
    const productValues = [
        product.productId,
        product.userId,
        product.productName,
        product.productPrice,
        product.createdDate,
        product.modifiedDate,
    ];
    return db.query(createQuery, productValues);
};


export const updateProduct = (keys, values, productId) => {
    const columns = keys.join(', ');
    const colValues = keys.map( (key, index) => `$${index + 1}`).join(', ');
    const createQuery = `UPDATE products
    SET (product_name, product_price)
    VALUES ($1, $2)
    WHERE product_id = ${productId}`;
    console.log(createQuery);
    return db.query(createQuery, values);
}

export const removeProduct = productID => {
    const createQuery = `DELETE FROM products WHERE product_id = $1`;

    return db.query(createQuery, productID);
}
