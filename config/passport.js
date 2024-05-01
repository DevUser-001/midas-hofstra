const mysql = require('mysql2/promise');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// Create a MySQL pool connection
const connection = mysql.createPool({
    host: '62.72.50.23',
    user: 'u619697559_midas_devuser',
    password: 'Devuser123#',
    database: 'u619697559_midas_hofsra'
});

module.exports = function(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            // Check if the user with the provided email exists in the database
            const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
            if (rows.length === 0) {
                return done(null, false, { message: 'Email not registered' });
            }
            const user = rows[0];

            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect password' });
            }
        } catch (error) {
            return done(error);
        }
    }));

    // Serialize user to store in session
    passport.serializeUser((user, done) => {
        done(null, user.id); // Store user id in session
    });

    // Deserialize user from session
    passport.deserializeUser(async (id, done) => {
        try {
            const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [id]);
            if (rows.length === 0) {
                return done(null, false);
            }
            const user = rows[0];
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    });
};
