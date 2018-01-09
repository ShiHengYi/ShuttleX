const express = require('express');
const apiRoutes = express.Router();
const Sequelize = require('sequelize');
const db = require('./models');


apiRoutes.get('/', (req, res) => {
    res.send("API found!");
});


apiRoutes.post('/account/register', (req, res) => {
	var reqName = req.body.account.name;
	var reqEmail = req.body.account.email;
	var reqPassword = req.body.account.password;
    //var seatCount = req.body.account.seatCount;
    var reqPassword_confirmation = req.body.account.password_confirmation;
    var isDriver = req.body.account.isDriver;
 
    db.account.create({
        name: reqName, 
        email: reqEmail, 
        seatCount: req.body.account.seatCount !== null ? req.body.account.seatCount : 0,
        password: reqPassword,
        isDriver: isDriver,
        payment: false
    })
    .then(account => {
        console.log(reqName, reqEmail, reqPassword, reqPassword_confirmation);
        res.json({message: `Hi ${reqName} you are now registered!`, uId: account.uid, name: reqName, email: reqEmail, password: reqPassword, seatCount: account.seatCount, payment:account.payment});
        
    }).catch( (error) => {
        res.status(400).json({
                status: 'failed',
                errors: null,
                message: 'Email already in use! Please use a different email'
            })});
});


apiRoutes.post('/account/login', (req, res) =>{
	var reqEmail = req.body.account.email;
	var reqPassword = req.body.account.password;
    var reqIsDriver = req.body.account.isDriver;

    db.account.findOne({
        where: {
            email: reqEmail,
            password: reqPassword,
            isDriver: reqIsDriver
        }
    })
    .then(account => {
        console.log(reqEmail, reqPassword);
        if (account !== null) {
            res.json({accountIsValid: true, uID: account.uid, name: account.name, email: account.email, password: account.password, seatCount: account.seatCount, payment:account.payment});
        }
        else{
            res.status(400).json({
                status: 'failed',
                errors: null,
                message: 'Invalid email or password!'
            })
        }
    }).catch( (error) => {
        res.status(400).json({
                status: 'failed',
                errors: null,
                message: 'Invalid email or password!'
            })});
});


apiRoutes.post('/account/updatePayment', (req, res) =>{
    var userId = req.body.uId;
    var cNumber = req.body.cNumber;
    var expr = req.body.expr;
    var cvc = req.body.cvc;

    db.payment.create({
        uid: userId, 
        cardNumber: cNumber, 
        expiry: expr,
        cvc: cvc
    })
    .then(payment => {
        db.account.update(
        { payment: true},
            { 
            fields: ['payment'],
            where: {uid: userId}
        }).then(account => { 
           console.log("Payment status updated for user : " + account);
        }).catch( (error) => {
            console.log(error);
        });
        res.json({message: "Payment method successfully added!"});
    }).catch( (error) => {
        res.status(400).json({
                status: 'failed',
                errors: error,
                message: 'Invalid Payment info!'
            })});
});


apiRoutes.post('/account/getPaymentInfo', (req, res) =>{
    var userId = req.body.uId;

    db.payment.findOne({
        where: {
            uid: userId
        }
    })
    .then(payment => {
        if (payment !== null) {
            res.json({accountIsValid: true, uID: payment.uid, cardNumber: payment.cardNumber, expiry: payment.expiry, cvc: payment.cvc});
        }
        else{
            res.status(400).json({
                status: 'failed',
                errors: payment,
                message: 'Could not find payment method!'
            })
        }
    }).catch( (error) => {
        res.status(400).json({
                status: 'failed',
                errors: error,
                message: 'Invalid request!'
            })});
});



apiRoutes.post('/account/updateProfile', (req, res) =>{
    var userId = req.body.account.uId;
    var reqName = req.body.account.name;
    var reqEmail = req.body.account.email;
    var reqPassword = req.body.account.password;


    db.account.update(
        { name: reqName, email: reqEmail, password: reqPassword },
            { 
            fields: ['name', 'email', 'password'],
            where: {uid: userId}
        }).then(account => { 
            if(account[0] != 0){ //returns 0 if account with given uid doesnt exist else returns 1
            res.status(200).json({status: "success", uId: userId});
            }else{
            res.status(400).json({
                status: 'failed',
                message: 'Account does not exist!'
            });
        }

        }).catch( (error) => {
        res.status(400).json({
                status: 'failed',
                message: 'Error Saving data!'
            })});

});

apiRoutes.post('/account/logout', (req, res) =>{
    var dId = req.body.dId;
    
    db.driver.update(
        { isOnline: false},
            { 
            fields: ['isOnline'],
            where: {did: dId}
        }).then(driver => { 
            if(driver[0] != 0){ //returns 0 if account with given uid doesnt exist else returns 1
            res.status(200).json({status: "success", did: driver});
            }else{
            res.status(400).json({
                status: 'failed',
                message: 'Account does not exist!'
            });
        }

        }).catch( (error) => {
        res.status(400).json({
                status: 'failed',
                message: 'Error Logging out'
            })});


});

apiRoutes.post('/account/driver/online', (req, res) =>{
    var dId = req.body.dId;
    
    db.driver.update(
        { isOnline: true},
            { 
            fields: ['isOnline'],
            where: {did: dId}
        }).then(driver => { 
            if(driver[0] != 0){ //returns 0 if account with given uid doesnt exist else returns 1
            res.status(200).json({status: "success", did: driver});
            }else{
            res.status(400).json({
                status: 'failed',
                message: 'Account does not exist!'
            });
        }

        }).catch( (error) => {
        res.status(400).json({
                status: 'failed',
                message: 'Error going online'
            })});


});

apiRoutes.post('/driver/create', (req, res) => {
    db.driver.create({
        did: req.body.driver.did,
        name: req.body.driver.name,
        isOnline: req.body.driver.isOnline,
        partyCount: req.body.driver.partyCount,
        totalSeats: req.body.driver.totalSeats,
        openSeats: req.body.driver.openSeats
    })
    .then(res => {});
});

apiRoutes.post('/driver/find/solo', (req, res) => {
    var seatsNeeded = req.body.riderequest.seatsNeeded;
    db.driver.findAll({
        where: {
            isOnline: true,
            partyCount: 0,
            openSeats: {
                [Sequelize.Op.gte]: seatsNeeded
            }
        }
    })
    .then(driverArray => {
        res.json({driverArray});
    })
});

apiRoutes.post('/driver/find/carpool', (req, res) => {
    var seatsNeeded = req.body.riderequest.seatsNeeded;
    var destinationID = req.body.riderequest.destinationID;
    var query = "SELECT * FROM Driver NATURAL JOIN Ride_request WHERE isOnline=true AND partyCount=1 AND openSeats>=" + seatsNeeded + " AND dropoff='" + destinationID + "' ";
    db.sequelize.query(query, {
        model: db.driver
    })
    .then(driverArray => {
        res.json({driverArray});
    });
});

apiRoutes.put('/driver/seats/occupy/:driver_id', (req, res) => {
    db.driver.update({
        partyCount: db.sequelize.literal('partyCount + 1'),
        openSeats: db.sequelize.literal('openSeats - ' + req.body.occupySeats.seatsNeeded)
    }, {
        where: {
            did: req.params.driver_id
        }
    })
    .then(driver => {
        res.send('Party count and occupied seats updated');
    });
});

apiRoutes.put('/driver/seats/free/:driver_id', (req, res) => {
    db.driver.update({
        partyCount: db.sequelize.literal('partyCount - 1'),
        openSeats: db.sequelize.literal('openSeats + ' + req.body.freeSeats.seatsNeeded)
    }, {
        where: {
            did: req.params.driver_id
        }
    })
    .then(driver => {
        res.send('Party count and occupied seats updated');
    });
});

apiRoutes.get('/riderequest/:driver_id', (req, res) => {
    db.ride_request.findOne({
        where: {
            did: req.params.driver_id
        }
    })
    .then(riderequest => {
        res.json({riderequest});
    });
});

apiRoutes.post('/riderequest/create', (req, res) => {
    db.ride_request.create({
        rid1: req.body.riderequest.rid1,
        rid2: req.body.riderequest.rid2,
        did: req.body.riderequest.did, 
        pickup1: req.body.riderequest.pickup1, 
        pickup2: req.body.riderequest.pickup2,
        dropoff: req.body.riderequest.dropoff
    })
    .then(riderequest => {
        res.send('Ride request created');
    });
});

apiRoutes.put('/riderequest/modify/:driver_id', (req, res) => {
    db.ride_request.update({
        rid2: req.body.riderequest.rid2,
        pickup2: req.body.riderequest.pickup2
    }, {
        where: {
            did: req.params.driver_id
        }
    })
    .then(riderequest => {
        res.send('Ride request modified');
    })
})

apiRoutes.delete('/riderequest/delete/:driver_id', (req, res) => {
    db.ride_request.destroy({
        where: {
            did: req.params.driver_id
        }
    })
    .then(() => {
        res.send('ride request deleted');
    });
})


module.exports = apiRoutes;