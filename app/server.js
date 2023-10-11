const path = require('path');
const express = require('express');

const app = express();
const HTTP_PORT = process.env.PORT || 8080;
const mongoose = require('mongoose');
const { engine } = require('express-handlebars');
const session = require('express-session');

const { login, register } = require('./components/drivers/drivers.controller');
const {
  deliveryOrders,
  updateOrderStatus,
  getCurrentOrder,
  markOrderDelivered,
} = require('./components/orders/orders.controller');
const { ensureLogin } = require('./middlewares/authorization');
const { upload } = require('./middlewares/fileUpload');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'session secret',
    resave: false,
    saveUninitialized: true,
  }),
);

const CONNECTION_STRING =
  'mongodb+srv://dbUser:G9bJEcsNmJUHVIgS@cluster0.7zmdwoo.mongodb.net/project01?retryWrites=true&w=majority';
mongoose.connect(CONNECTION_STRING);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to database: '));
db.once('open', () => {
  console.log('Mongo DB connected successfully. 🚀');
});

/** API routes start */
app.get('/', (req, res) => {
  return res.redirect('/login');
});

app.get('/login', function (req, res) {
  return res.render('login', { layout: false });
});

app.get('/register', function (req, res) {
  return res.render('register', { layout: false });
});

app.post('/login', async (req, res) => {
  login(req, res);
});

app.post('/register', async (req, res) => {
  register(req, res);
});

app.get('/dashboard', ensureLogin, async (req, res) => {
  deliveryOrders(req, res);
});

app.post('/update-status/:id', ensureLogin, async (req, res) => {
  console.log('inside update status');
  updateOrderStatus(req, res);
});

app.get('/current-order', ensureLogin, async (req, res) => {
  getCurrentOrder(req, res);
});

app.post('/mark-delivered/:id', [ensureLogin, upload.single('photo')], async (req, res) => {
  markOrderDelivered(req, res);
});
const onHttpStart = () => {
  console.log(`Express web server running on port: ${HTTP_PORT}`);
  console.log(`Press CTRL+C to exit`);
};

app.listen(HTTP_PORT, onHttpStart);
