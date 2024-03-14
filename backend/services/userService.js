// userService.js

const User = require('../models/userModel');

async function findOrCreateUser(email) {
    try {
        // Sprawdź, czy użytkownik o podanym adresie e-mail istnieje już w bazie danych
        let user = await User.findOne({ email });

        // Jeśli użytkownik istnieje, zwróć go
        if (user) {
            return user;
        }

        // Jeśli użytkownik nie istnieje, utwórz nowego użytkownika i zwróć go
        user = await User.create({ email, activeCalendars: [] });
        return user;
    } catch (error) {
        // Obsłuż błędy, jeśli wystąpią
        console.error('Error finding or creating user:', error);
        throw error;
    }
}

module.exports = findOrCreateUser;
