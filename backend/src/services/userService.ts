import User from '../models/userModel.js';

export const findOrCreateUser = async (email) => {
    try {
        let user = await User.findOne({ email });

        if (user) {
            return user;
        }
        user = await User.create({ email, activeCalendars: [] });
        return user;
    } catch (error) {
        console.error('Error finding or creating user:', error);
        throw error;
    }
}

//module.exports = findOrCreateUser;
