import * as ProductRepository from '../repository/ProductRepository';
import Product from '../models/Product';

const ProductService = {

    async getProduct(req, res) {
        try {
            const { rows } = await ProductRepository.getProduct([req.params.id]);

            if (!rows[0]) {
                return res.status(400).send({ message: 'We did not find product with chosen id' });
            }

            return res.status(200).send(rows[0]);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async getProducts(req, res) {
        try {
            const { rows } = await ProductRepository.getProducts( [req.body.user.id]);

            if (!rows[0]) {
                return res.status(400).send({ message: 'You have no products' });
            }

            return res.status(200).send(rows);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async addProduct(req, res) {
        const reqBody = req.body;
        if (!reqBody.product_name || !reqBody.product_price ) {
            return res.status(400).send({ message: 'Some values are missing' });
        }
        const product = new Product(reqBody);
        try {
            const { rows } = await ProductRepository.createProduct(product);

            if (rows[0]) {
                return res.status(201).send({product: rows[0]});
            } else {
                return res.status(400).send({ message: 'We could not add the product' });
            }
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async editProduct(req, res) {
        const reqBody = req.body;
        try {
            const { rows } = await ProductRepository.updateProduct(reqBody.keys, [reqBody.values], req.params.id);

            if (!rows[0]) {
                return res.status(400).send({message: 'You have no products to update'});
            }
            return res.status(204);

        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async removeProduct(req, res) {
        try {
            await ProductRepository.removeProduct(req.params.id)
            return res.status(200).send();
        } catch (error) {
            return res.status(400).send(error);
        }
    }
};

export default ProductService;
