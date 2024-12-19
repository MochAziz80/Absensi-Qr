# Office Attendance System

This project is a web-based attendance system that uses QR codes to manage employee attendance. The system consists of a backend built with Express.js and MongoDB and a frontend built with React.js.

## Features
- Add, update, and delete employee data
- Record attendance using QR codes
- View attendance history

## Technologies Used
- Backend: Node.js, Express.js, MongoDB
- Frontend: React.js
- Database: MongoDB Atlas

## Prerequisites
Ensure you have the following installed on your system:
- Node.js
- npm or Yarn

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/office-attendance.git
cd office-attendance
```

### 2. Install Dependencies

#### General
Navigate to the project directory and install dependencies:
```bash
cd project
npm install
```

### 3. Set Up Environment Variables

#### Backend
Edit a `config.js` file in the `server` directory and add the following:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/office-attendance?retryWrites=true&w=majority
PORT=3000
```
Replace `<username>` and `<password>` with your MongoDB Atlas credentials.

#### Frontend
In the `frontend` directory, update the API base URL in the configuration file (if necessary).

### 4. Start the Application

#### Backend
```bash
cd server
npm run server
```

#### Frontend
```bash
cd ../src
npm run dev
```

### 5. Access the Application
Open your browser and navigate to:
```
http://localhost:5173
```

## Contributing
Contributions are welcome! Please fork this repository and submit a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments
- QR Code functionality is powered by `react-qr-reader` or similar libraries.
- Special thanks to the contributors of open-source libraries used in this project.
