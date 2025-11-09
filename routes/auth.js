import express from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import { users } from '../config/passportConfig.js';

const router = express.Router();

// --- Registration ---
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });
    res.redirect('/login');
});

// --- Login ---
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/protected',
    failureRedirect: '/login'
}));

// --- Logout ---
router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) return next(err);
        res.redirect('/login');
    });
});

export default router;
