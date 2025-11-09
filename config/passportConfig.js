import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

// Простий масив користувачів (можна замінити на БД)
const users = [];

function initialize(passport) {
    const authenticateUser = (email, password, done) => {
        const user = users.find(u => u.email === email);
        if (!user) {
            return done(null, false, { message: 'No user with that email' });
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) return done(err);
            if (result) return done(null, user);
            else return done(null, false, { message: 'Password incorrect' });
        });
    };

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.email));
    passport.deserializeUser((email, done) => {
        const user = users.find(u => u.email === email);
        done(null, user);
    });
}

export default initialize;
export { users };
