import express from 'express';
import session from 'express-session';
import passport from 'passport';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import protectedRoutes from './routes/protected.js';
import initializePassport from './config/passportConfig.js';

// --- Paths ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- App setup ---
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'supersecretkey',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: false } // secure: true для HTTPS
}));

// --- Passport setup ---
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// --- Routes ---
app.use('/', authRoutes);
app.use('/', protectedRoutes);

// --- Server start ---
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
