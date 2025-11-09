import express from 'express';
const router = express.Router();

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}

router.get('/protected', checkAuthenticated, (req, res) => {
    res.render('protected', { email: req.user.email });
});

export default router;
