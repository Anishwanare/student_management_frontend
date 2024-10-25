import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentData from './components/StudentData';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import StudentRegister from './components/StudentRegister';
import StudentUpdate from './components/StudentUpdate';
import StudentProfile from './components/StudentProfile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentData />} />
        <Route path="/register" element={<StudentRegister />} />
        <Route path="/update/student/:id" element={<StudentUpdate />} />
        <Route path="/student/profile/:id" element={<StudentProfile />} />
      </Routes>
    </Router>
  );
};

export default App;
