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
        product.product_id,
        product.user_id,
        product.product_name,
        product.product_price,
        product.created_date,
        product.modified_date,
    ];
    return db.query(createQuery, productValues);
};


export const updateProduct = (keys, values, productId) => {
    const columns = keys.join(', ');
    const colValues = keys.map( (key, index) => `$${index + 1}`);
    const createQuery = `UPDATE products
    SET (${columns})
    VALUES (${colValues})
    WHERE product_id = ${productId}`;

    return db.query(createQuery, values);
}

export const removeProduct = productID => {
    const createQuery = `DELETE FROM products WHERE product_id = $1`;

    return db.query(createQuery, productID);
}
