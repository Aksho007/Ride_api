const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');

module.exports.createUser = async ({
    firstname, lastname, email, password
}) => {
    if (!firstname || !email || !password) {
        throw new Error('All fields are required');
    }
    const user = userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    })

    return user;
}

module.exports.listRides = async (email, password) => {
    if (!email || !password) {
        throw new Error('Please login with the right credentials');
    }

    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
        throw new Error('Please login with the right credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Please login with the right credentials');
    }

    return [
        { rideId: '1', distance: '10km', fare: '$15' },
        { rideId: '2', distance: '5km', fare: '$8' },
        { rideId: '3', distance: '20km', fare: '$25' }
    ];
};

module.exports.getUserData = async (email, password) => {
    if (!email || !password) {
        throw new Error('Please login with the right credentials');
    }

    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
        throw new Error('Please login with the right credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Please login with the right credentials');
    }

    return user;
};