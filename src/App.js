import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserGrid from './components/UserGrid';
import UserForm from './components/UserForm';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Container, Box } from '@mui/material'; 

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            padding: 3, 
            backgroundColor: '#f4f4f4', 
            fontFamily: 'Roboto, sans-serif', 
          }}
        >
          
          <Container maxWidth="lg" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<UserGrid />} />
              <Route path="/add-user" element={<UserForm />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </Provider>
  );
};

export default App;
