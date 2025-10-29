import React from 'react';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import CourseView from './components/CourseView';
import StudyTools from './components/StudyTools';
import Achievements from './components/Achievements';
import Profile from './components/Profile';

function App() {
  return (
    <ChakraProvider>
      <CSSReset />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/course/:id" element={<CourseView />} />
          <Route path="/study-tools" element={<StudyTools />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;