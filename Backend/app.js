require('dotenv').config();

const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();

const port = 3000;

// importing routes

const path = require('path');
const cors = require('cors');

const loginRoute = require('./routes/loginRoute');
const signUpRoute = require('./routes/signUpRoute');
const forgetPasswordRoute = require('./routes/forgetPasswordRoute');
const dashboardRoute = require('./routes/dashboardRoute');
const paymentRoute = require('./routes/paymentRoute');
const premiumDashboardRoute = require('./routes/premiumDashboardRoute');

// database

const sequelize = require('./utils/db-connection');
const User = require('./models/signUpModel');
const Expense = require('./models/dashboardModel');

// Middleware

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../Frontend')));

// Import associations

require("./associations/associations.js");

// SignUp routes

app.use('/user', signUpRoute);
app.use('/dashboard', dashboardRoute);
app.use('/premium-dashboard', premiumDashboardRoute);
app.use('/payment', paymentRoute);
app.use('/user', loginRoute);
app.use('/forgetpassword', forgetPasswordRoute);



// SSL / HTTPS Configuration
const sslOptions = {
    key: fs.readFileSync(
        path.join(__dirname, 'cert', 'server.key')
    ),

    cert: fs.readFileSync(
        path.join(__dirname, 'cert', 'server.crt')
    )
};


// Database Connection
sequelize.sync({ alter: true }).then(async () => {

    // Update existing users' totalExpenses on startup
    try {

        const users = await User.findAll({
            where: {
                totalExpenses: 0
            }
        });

        for (const user of users) {

            const expenses = await Expense.findAll({
                where: {
                    UserId: user.id
                },

                attributes: [
                    [
                        sequelize.fn('SUM', sequelize.col('amount')),
                        'total'
                    ]
                ]
            });

            const total = expenses[0]?.dataValues.total || 0;

            if (total > 0) {

                await user.update({
                    totalExpenses: total
                });

                console.log(
                    `Updated ${user.name}'s totalExpenses to ₹${total}`
                );
            }
        }

    } catch (error) {

        console.error(
            'Error updating totalExpenses on startup:',
            error
        );
    }


    // Start HTTPS Server
    https.createServer(sslOptions, app).listen(port, () => {

        console.log(
            `HTTPS Server running at https://localhost:${port}`
        );

    });

}).catch((error) => {

    console.error(
        'Unable to connect to the database:',
        error
    );

});