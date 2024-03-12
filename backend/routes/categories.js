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
app.get('/api', (req, res) => {
  res.json({ message: "Hello from backend express" });
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
