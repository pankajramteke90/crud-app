import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserForm from '../UserForm';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';  
import { MemoryRouter } from 'react-router-dom';

describe('UserForm Component', () => {
  test('renders the form with input fields and submit button', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserForm />
        </MemoryRouter>
      </Provider>
    );
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add user/i })).toBeInTheDocument();
  });

  test('shows validation errors when inputs are empty and form is submitted', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserForm />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /add user/i }));

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });
  });

  test('form submits successfully with valid input', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserForm />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.input(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.input(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });

    fireEvent.click(screen.getByRole('button', { name: /add user/i }));

    await waitFor(() => {
      expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/email is required/i)).not.toBeInTheDocument();
    });
  });
});
