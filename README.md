# Expenses Tracker App

A full-stack expense tracking application with user authentication, expense management, and premium features.

## Features

- User registration and login
- Add, edit, and delete expenses
- Expense categorization
- Pagination for expense lists
- Premium features (leaderboard, PDF reports)
- Payment integration with Cashfree
- Forgot password functionality

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: MySQL (via Sequelize)
- **Authentication**: JWT
- **Payment**: Cashfree

## Local Development

1. Install dependencies:
```bash
cd Backend
npm install
```

2. Configure environment variables in `Backend/.env`:
```
DB_HOST=your_mysql_host
DB_PORT=your_mysql_port
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
```

3. Start the server:
```bash
npm start
```

The app will run on `http://localhost:3000`

## Vercel Deployment

### Prerequisites

- Vercel account
- GitHub repository with this code
- MySQL database (Aiven or any cloud MySQL)

### Deployment Steps

1. **Push code to GitHub**

2. **Install Vercel CLI** (optional):
```bash
npm i -g vercel
```

3. **Deploy to Vercel**:
```bash
vercel
```

Or connect your GitHub repository in the Vercel dashboard.

4. **Configure Environment Variables in Vercel Dashboard**:
   - Go to your project settings in Vercel
   - Navigate to Environment Variables
   - Add the following variables:
     - `DB_HOST`: Your Aiven MySQL host
     - `DB_PORT`: Your Aiven MySQL port
     - `DB_USER`: Your Aiven MySQL username
     - `DB_PASSWORD`: Your Aiven MySQL password
     - `DB_NAME`: Your database name (usually defaultdb)

5. **Redeploy** after adding environment variables

### Important Notes

- The `.env` file is gitignored and should not be committed
- Environment variables must be configured in Vercel dashboard
- SSL/HTTPS is handled by Vercel automatically
- The app uses serverless functions via Vercel

## Project Structure

```
Expenses-Tracker-app/
├── Backend/
│   ├── app.js              # Main Express app
│   ├── .env                # Environment variables (local)
│   ├── controllers/        # Route controllers
│   ├── models/            # Sequelize models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── services/          # Business logic
│   └── utils/             # Utility functions
├── Frontend/
│   ├── css/               # Stylesheets
│   ├── js/                # Frontend JavaScript
│   └── *.html             # HTML pages
├── api/
│   └── index.js           # Vercel serverless entry point
├── vercel.json            # Vercel configuration
└── README.md              # This file
```

## Database Setup

The app uses Sequelize ORM which will automatically create/alter tables on startup. Ensure your MySQL database is accessible and the credentials are correct.

## License

ISC
