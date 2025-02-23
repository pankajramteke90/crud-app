import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';


jest.mock('./components/UserGrid', () => () => <div>UserGrid Component</div>);
jest.mock('./components/UserForm', () => () => <div>UserForm Component</div>);

describe('App Component', () => {
  test('renders the app correctly with the correct routes', async () => {
    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );

    
    expect(screen.getByText(/UserGrid Component/i)).toBeInTheDocument();
    
 
    fireEvent.click(screen.getByText(/add user/i)); 
    
    
    expect(screen.getByText(/UserForm Component/i)).toBeInTheDocument();
  });

  test('renders the correct structure and material ui components', () => {
    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );

   
    expect(screen.getByRole('container')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /user records/i })).toBeInTheDocument();  
  });
});
