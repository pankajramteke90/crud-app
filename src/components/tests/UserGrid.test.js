import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserGrid from '../UserGrid';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { MemoryRouter } from 'react-router-dom';
import { fetchUsers } from '../../redux/userSlice';

jest.mock('../../redux/userSlice', () => ({
  fetchUsers: jest.fn(),
}));

describe('UserGrid Component', () => {
  beforeEach(() => {
    fetchUsers.mockResolvedValue({ data: [{ id: 1, name: 'John Doe', email: 'john@example.com' }] });
  });

  test('renders UserGrid and displays users', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserGrid />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => expect(fetchUsers).toHaveBeenCalledTimes(1));

    expect(screen.getByText(/User Records/i)).toBeInTheDocument();
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
  });

  test('click on edit button shows input fields', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserGrid />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => expect(fetchUsers).toHaveBeenCalledTimes(1));

    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('click on delete button calls deleteUser', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserGrid />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => expect(fetchUsers).toHaveBeenCalledTimes(1));

    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    expect(screen.queryByText(/john doe/i)).not.toBeInTheDocument();
  });
});
