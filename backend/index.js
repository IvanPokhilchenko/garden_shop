const express = require('express');
const cors = require('cors');
const sequelize = require('./database/database');
const categories = require('./routes/categories');
const sale = require('./routes/sale');
const order = require('./routes/order');
const products = require('./routes/products');
const Category = require('./database/models/category');
const Product = require('./database/models/product');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.static('public'));
app.use(cors({ origin: '*' }));
app.use(express.urlencoded());
app.use(express.json());

// Объединяем маршруты для вашего API
app.get('/api', async (req, res) => {
  try {
    const categoriesData = await Category.findAll();
    const productsData = await Product.findAll();
    // Здесь можно также получить данные о sale и order, если это необходимо
    
    res.json({ categories: categoriesData, products: productsData });
  } catch (err) {
    console.error('Error while fetching data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use('/categories', categories);
app.use('/products', products);
app.use('/sale', sale);
app.use('/order', order);

Category.hasMany(Product);

// Объединяем слушатель порта
const startServer = async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (err) {
    console.error('Unable to start server:', err);
  }
};

startServer();
