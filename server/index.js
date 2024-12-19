import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { AttendanceModel } from './models/attendance.js';
import { EmployeeModel } from './models/employee.js';
import connectDB from './config.js'; 

const app = express();
app.use(cors());
app.use(express.json());
connectDB();
// MongoDB Connection
mongoose.connect('mongodb+srv://mochaziz290:Azizgans29@discord-bot-cluster.9rpyb.mongodb.net/office-attendance?retryWrites=true&w=majority&appName=discord-bot-cluster');

// Employee CRUD endpoints
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await EmployeeModel.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/employees', async (req, res) => {
  try {
    const employee = new EmployeeModel(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/employees/:id', async (req, res) => {
  try {
    const employee = await EmployeeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/employees/:id', async (req, res) => {
  try {
    const employee = await EmployeeModel.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Attendance endpoints remain the same
app.post('/api/attendance', async (req, res) => {
  try {
    const attendance = new AttendanceModel({
      employeeId: req.body.employeeId,
      timestamp: new Date(),
      type: req.body.type
    });
    await attendance.save();
    res.status(201).json(attendance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/attendance', async (req, res) => {
  try {
    const attendance = await AttendanceModel.find()
      .populate('employeeId')
      .sort({ timestamp: -1 });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});