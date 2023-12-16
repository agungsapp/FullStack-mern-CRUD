// Import modul yang diperlukan
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import UserRoute from './routes/UserRoute.js';

// Konfigurasi dotenv
dotenv.config();

// Koneksi ke MongoDB
mongoose.connect(process.env.MONGO).then(() => {
  console.log("Connected to MongoDB!");
}).catch((err) => {
  console.log("Error connecting to MongoDB:", err);
});

// Inisialisasi aplikasi Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Mengizinkan JSON body ke route POST

// Menetapkan rute
app.use(UserRoute);

// Middleware untuk penanganan error
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Menjalankan server
app.listen(5000, () => {
  console.log('Server is running on port 5000!');
});
