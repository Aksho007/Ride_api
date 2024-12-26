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



module.exports.getRideDetails = async (rideId) => {
    const rides = [
        {
            rideId: '10ys5nkwzruicb',
            vehicleDetails: {
                vehicleType: 'Sedan',
                vehicleNumber: 'DL5LMN1234',
                vehicleName: 'Honda City'
            },
            pickupDetails: {
                pickupTime: '2023-10-01T10:00:00Z',
                pickupLocation: 'Connaught Place, Delhi'
            },
            dropoffDetails: {
                dropoffTime: '2023-10-01T10:30:00Z',
                dropoffLocation: 'India Gate, Delhi'
            },
            fare: {
                rideFare: 150,
                tax: 15,
                paymentMethod: 'Cash'
            },
            driverName: 'John Doe',
            rideDate: '2023-10-01T10:00:00.000Z',
            rideStatus: 'Completed'
        },
        {
            rideId: 'yc62gyyyq7exz',
            vehicleDetails: {
                vehicleType: 'Hatchback',
                vehicleNumber: 'DL5LMN5678',
                vehicleName: 'Maruti Swift'
            },
            pickupDetails: {
                pickupTime: '2023-10-02T11:00:00Z',
                pickupLocation: 'Karol Bagh, Delhi'
            },
            dropoffDetails: {
                dropoffTime: '2023-10-02T11:20:00Z',
                dropoffLocation: 'Chandni Chowk, Delhi'
            },
            fare: {
                rideFare: 80,
                tax: 8,
                paymentMethod: 'Credit Card'
            },
            driverName: 'Jane Smith',
            rideDate: '2023-10-02T11:00:00.000Z',
            rideStatus: 'Completed'
        },
        {
            rideId: 'ht4u26dq1konh',
            vehicleDetails: {
                vehicleType: 'SUV',
                vehicleNumber: 'DL5LMN9876',
                vehicleName: 'Mahindra XUV500'
            },
            pickupDetails: {
                pickupTime: '2023-10-03T12:00:00Z',
                pickupLocation: 'Saket, Delhi'
            },
            dropoffDetails: {
                dropoffTime: '2023-10-03T12:40:00Z',
                dropoffLocation: 'Hauz Khas, Delhi'
            },
            fare: {
                rideFare: 250,
                tax: 25,
                paymentMethod: 'Debit Card'
            },
            driverName: 'Mike Johnson',
            rideDate: '2023-10-03T12:00:00.000Z',
            rideStatus: 'Pending'
        }
    ];

    const ride = rides.find(r => r.rideId === rideId);
    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;
};