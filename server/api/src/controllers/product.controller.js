const db = require('../config/database');

// ==> Método responsável por criar um novo 'Pessoa':
/* exports.createProduct = async (req, res) => {
  const { product_name, quantity, price } = req.body;
  const response = await db.query(
    'INSERT INTO pessoa (product_name, quantity, price) VALUES ($1, $2, $3)',
    [product_name, quantity, price],
  );

  res.status(201).send({
    message: 'Product added successfully!',
    body: {
      product: { product_name, quantity, price },
    },
  });
}; */

var x = 0
// ==> Método responsável por listar todos os 'Products':
exports.listAllProducts = async (req, res) => {
  console.log('Entrou', x)
  x++
  const response = await db.query(
    'SELECT * FROM pessoa',
  );
  res.status(200).send(response.rows);
};

// ==> Método responsável por selecionar 'Product' pelo 'Id':
/* exports.findProductById = async (req, res) => {
  const productId = parseInt(req.params.id);
  const response = await db.query(
    'SELECT * FROM products WHERE productid = $1',
    [productId],
  );
  res.status(200).send(response.rows);
}; */

// ==> Método responsável por atualizar um 'Product' pelo 'Id':
/* exports.updateProductById = async (req, res) => {
  const productId = parseInt(req.params.id);
  const { product_name, quantity, price } = req.body;

  const response = await db.query(
    'UPDATE products SET product_name = $1, quantity = $2, price = $3 WHERE productId = $4',
    [product_name, quantity, price, productId],
  );

  res.status(200).send({ message: 'Product Updated Successfully!' });
}; */

// ==> Método responsável por excluir um 'Product' pelo 'Id':
/* exports.deleteProductById = async (req, res) => {
  const productId = parseInt(req.params.id);
  await db.query('DELETE FROM products WHERE productId = $1', [
    productId,
  ]);

  res.status(200).send({ message: 'Product deleted successfully!', productId });
};
 */