const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user.model')


const signupUser = (req, res) => {
    const { email, password, username, role = 'user' } = req.body; // El rol por defecto es 'user'

    if (!email || !password || !username) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ message: 'Error hashing password' });

        const newUser = new User({
            email,
            password: hashedPassword,
            username,
            role,  // Este rol se asigna cuando se registra un usuario
        });

        newUser
            .save()
            .then(user => res.status(201).json(user))
            .catch(err => res.status(500).json({ message: 'Error saving user', err }));
    });
}


const loginUser = (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                return next(new Error('User not found'))
            }
            const isCorrectPass = bcrypt.compareSync(password, user.password)
            if (!isCorrectPass) {
                return res.status(401).json({ message: 'Incorrect password' })
            }

            const { _id, email, username, role } = user;
            const payLoad = { _id, email, username, role }

            const authToken = jwt.sign(
                payLoad,
                process.env.TOKEN_SECRET,
                { algorithm: 'HS256', expiresIn: '6h' } // El token expira en 6 horas
            )
            res.json({ authToken });

        })
        .catch(err => next(err))

}

const verifyAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'You are not authorized to access this route' });
    }
    next();
}



module.exports = { loginUser, signupUser, verifyAdmin }