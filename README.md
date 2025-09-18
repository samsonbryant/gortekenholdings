# Gorteken Pension System

A full-stack web application for pension management built with React (frontend) and Node.js/Express (backend).

## Features

- User authentication (signup, login, email verification)
- Contact form management
- Career applications
- Payment processing
- Protected routes and admin dashboard
- Responsive design with Tailwind CSS

## Tech Stack

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Hero Icons

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- Nodemailer for email services

## Local Development

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd gorteken-pension
```

2. Install dependencies for both frontend and backend:
```bash
# Frontend dependencies
npm install

# Backend dependencies
cd server
npm install
cd ..
```

3. Create environment files:

Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:5000
```

Create a `.env` file in the `server` directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

4. Start the development servers:
```bash
npm run dev:full
```

This will start both the frontend (port 5173) and backend (port 5000) servers.

## Deployment on Render

This project is configured for deployment on Render using the `render.yaml` file.

### Prerequisites
- GitHub repository
- Render account
- MongoDB Atlas database
- Environment variables configured

### Deployment Steps

1. **Push your code to GitHub**

2. **Connect to Render:**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New" → "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect the `render.yaml` file

3. **Set up Environment Variables:**
   
   For the backend service (`gorteken-api`), configure these environment variables in Render:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random string for JWT token signing
   - `NODE_ENV`: Set to `production`
   - `PORT`: Set to `10000` (Render default)
   - `FRONTEND_URL`: Will be automatically set from the frontend service URL

4. **Deploy:**
   - Click "Apply" to deploy both services
   - The backend will be deployed as a web service
   - The frontend will be deployed as a static site

### Environment Variables Required

**Backend (.env in server directory):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://your-frontend-url.onrender.com
```

**Frontend (.env in root directory):**
```env
VITE_API_URL=https://your-api-url.onrender.com
```

### Post-Deployment

1. **Verify Services:**
   - Check that both services are running
   - Test the API health check endpoint
   - Verify frontend can communicate with backend

2. **Configure Domain (Optional):**
   - Set up custom domain in Render dashboard
   - Update CORS settings if needed

## Project Structure

```
gorteken-pension/
├── public/                 # Static assets
├── src/                   # Frontend source code
│   ├── components/        # React components
│   ├── contexts/         # React contexts
│   ├── pages/            # Page components
│   ├── services/         # API services
│   └── styles/           # CSS files
├── server/               # Backend source code
│   ├── config/          # Database configuration
│   ├── middleware/      # Express middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   └── utils/           # Utility functions
├── render.yaml          # Render deployment configuration
└── package.json         # Frontend dependencies
```

## Available Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

**Backend:**
- `npm run start` - Start production server
- `npm run dev` - Start development server with nodemon

**Full Stack:**
- `npm run dev:full` - Start both frontend and backend

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
