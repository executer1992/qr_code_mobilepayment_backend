import * as ProductRepository from '../repository/ProductRepository';
import Product from '../models/Product';

const ProductService = {
  async getProduct(req, res) {
    try {
      const { rows } = await ProductRepository.getProduct([req.params.id]);

      if (!rows[0]) {
        return res
          .status(400)
          .send({ message: 'We did not find product with chosen id' });
      }

      return res.status(200).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async getProducts(req, res) {
    try {
      const { rows } = await ProductRepository.getProducts([req.body.user.id]);
      return res.status(200).send(rows);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async addProduct(req, res) {
    const reqBody = req.body;
    if (!reqBody.product_name || !reqBody.product_price) {
      return res.status(400).send({ message: 'Some values are missing' });
    }
    const product = new Product(reqBody);
    try {
      await ProductRepository.createProduct(product);
      return res.status(201).send(product);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async editProduct(req, res) {
    const productName = req.body.product_name;
    const productPrice = req.body.product_price;
    try {
      const { rows } = await ProductRepository.updateProduct(
        ['product_name', 'product_price'],
        [productName, productPrice],
        req.params.id
      ).then(res => console.log(res)).catch(err => console.log(err));

      if (!rows[0]) {
        return res
          .status(400)
          .send({ message: 'You have no products to update' });
      }
      return res.status(204).send();
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async removeProduct(req, res) {
    try {
      await ProductRepository.removeProduct(req.params.id);
      return res.status(200).send();
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};

export default ProductService;
