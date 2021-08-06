const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3001;

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token)
    return res.status(401).send({
      error: {
        code: 'TOKEN_REQUIRED',
      },
    });

  try {
    const payload = jwt.verify(token, 'secret');
    next();
  } catch (error) {
    return res.status(401).send({
      error: {
        code: 'TOKEN_EXPIRED',
      },
    });
  }
};

const login = (username) => {
  return jwt.sign(
    {
      roles: ['ADMIN'],
      userId: 1,
    },
    'secret',
    {
      subject: username,
      expiresIn: '20min',
      // expiresIn: '10s',
    }
  );
};

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (username === 'user2' && password === 'pass')
    return res.status(401).send({
      error: {
        code: 'ACCOUNT_NOT_ACTIVATED',
      },
    });

  if (username === 'user' && password === 'pass') {
    const token = await login(username);
    const refreshToken = await jwt.sign({}, 'secret', {
      subject: username,
      expiresIn: '1week',
    });

    return res
      .status(200)
      .cookie('refreshToken', refreshToken, {
        sameSite: 'strict',
        path: '/',
        expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
      })
      .send({
        token,
      });
  }

  return res.status(401).send({
    error: {
      code: 'INVALID_CREDENTIALS',
    },
  });
});

app.post('/api/refreshToken', async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken)
    return res.status(401).send({
      error: {
        code: 'REFRESH_TOKEN_REQUIRED',
      },
    });

  try {
    const data = await jwt.verify(refreshToken, 'secret');

    const token = login(data.sub);
    return res
      .status(200)
      .cookie('refreshToken', refreshToken, {
        sameSite: 'strict',
        path: '/',
        expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
      })
      .send({
        token,
      });
  } catch (error) {
    console.log(error);
    return res.status(401).end();
  }
});

let entries = [
  {
    productName: 'Brown eggs',
    category: 'dairy',
    price: 28.1,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Sweet fresh stawberry',
    category: 'fruit',
    price: 29.45,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Asparagus',
    category: 'vegetable',
    price: 18.95,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Green smoothie',
    category: 'dairy',
    price: 17.68,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Raw legums',
    category: 'vegetable',
    price: 17.11,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Baking cake',
    category: 'dairy',
    price: 11.14,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Pesto with basil',
    category: 'vegetable',
    price: 18.19,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Hazelnut in black ceramic bowl',
    category: 'vegetable',
    price: 27.35,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Fresh stawberry',
    category: 'fruit',
    price: 28.59,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Lemon and salt',
    category: 'fruit',
    price: 15.79,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Homemade bread',
    category: 'bakery',
    price: 17.48,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Legums',
    category: 'vegetable',
    price: 14.77,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Fresh tomato',
    category: 'vegetable',
    price: 16.3,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Healthy breakfast',
    category: 'fruit',
    price: 13.02,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Green beans',
    category: 'vegetable',
    price: 28.79,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Baked stuffed portabello mushrooms',
    category: 'bakery',
    price: 20.31,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Strawberry jelly',
    category: 'fruit',
    price: 14.18,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Pears juice',
    category: 'fruit',
    price: 19.49,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Fresh pears',
    category: 'fruit',
    price: 15.12,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Caprese salad',
    category: 'vegetable',
    price: 16.76,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Oranges',
    category: 'fruit',
    price: 21.48,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Vegan food',
    category: 'vegetable',
    price: 29.66,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Breakfast with muesli',
    category: 'dairy',
    price: 22.7,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Honey',
    category: 'bakery',
    price: 17.01,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Breakfast with cottage',
    category: 'fruit',
    price: 14.05,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Strawberry smoothie',
    category: 'fruit',
    price: 28.86,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Strawberry and mint',
    category: 'fruit',
    price: 26.21,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Ricotta',
    category: 'dairy',
    price: 27.81,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Cuban sandwiche',
    category: 'bakery',
    price: 18.5,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Granola',
    category: 'dairy',
    price: 29.97,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Smoothie with chia seeds',
    category: 'fruit',
    price: 25.26,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Yogurt',
    category: 'dairy',
    price: 27.61,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Sandwich with salad',
    category: 'vegetable',
    price: 22.48,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Cherry',
    category: 'fruit',
    price: 14.35,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Raw asparagus',
    category: 'vegetable',
    price: 22.97,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Corn',
    category: 'vegetable',
    price: 13.55,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Vegan',
    category: 'vegan',
    price: 28.96,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Fresh blueberries',
    category: 'fruit',
    price: 21.01,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Smashed avocado',
    category: 'fruit',
    price: 25.88,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Italian ciabatta',
    category: 'bakery',
    price: 15.18,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Rustic breakfast',
    category: 'dairy',
    price: 21.32,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Sliced lemons',
    category: 'fruit',
    price: 27.14,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Plums',
    category: 'fruit',
    price: 19.18,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'French fries',
    category: 'bakery',
    price: 18.32,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Strawberries',
    category: 'fruit',
    price: 15.13,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Ground beef meat burger',
    category: 'meat',
    price: 11.73,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Tomatoes',
    category: 'fruit',
    price: 26.03,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Basil',
    category: 'vegetable',
    price: 15.19,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Fruits bouquet',
    category: 'fruit',
    price: 18.18,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
  {
    productName: 'Peaches on branch',
    category: 'fruit',
    price: 25.62,
    timestamp: '04.06.2021',
    unit: 'QUANTITY',
  },
].map((x, idx) => ({ ...x, id: idx }));

app.get('/api/entries', authMiddleware, (req, res) => {
  const { cursor } = req.query;
  const length = 10;
  const index = Number.parseInt(cursor) || 0;
  res.send({
    entries: entries.slice(index, index + length),
    next: index + length < entries.length ? index + length : null,
  });
});

const products = [
  {
    id: 1,
    name: 'chleb',
    category: 'bread',
  },
  {
    id: 2,
    name: 'mleko',
    category: 'milk',
  },
];

app.get('/api/products/:product', (req, res) => {
  const productId = req.params.product;

  const product = products.find((prod) => prod.id == productId);

  res.send({
    product,
  });
});

app.post('/api/entries', authMiddleware, (req, res) => {
  entries = [...entries, { ...req.body, id: entries.length + 1 }];
  res.sendStatus(201);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
