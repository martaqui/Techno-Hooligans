const { signupUser, loginUser, verifyAdmin } = require('../controllers/auth.controllers');
const verifyToken = require('../middleware/verifyToken');

const router = require('express').Router();

router.post('/signup', signupUser);

router.post('/login', loginUser);

router.post('/create-product', verifyToken, verifyAdmin, (req, res) => {
  res.json({ message: 'Product created!' });
});

router.get('/users', verifyToken, verifyAdmin, (req, res) => {
  res.json({ message: 'All users' });
})

module.exports = router;
