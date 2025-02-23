import axios from 'axios';
import axiosInstance from '../axios';

jest.mock('axios');

describe('Axios instance', () => {
  it('should make a successful GET request', async () => {
    const response = { data: [{ id: 1, name: 'John Doe', email: 'john@example.com' }] };
    axios.get.mockResolvedValue(response);

    const result = await axiosInstance.get('/users');
    expect(result.data).toEqual(response.data);
  });

  it('should handle error in GET request', async () => {
    const error = new Error('Network Error');
    axios.get.mockRejectedValue(error);

    try {
      await axiosInstance.get('/users');
    } catch (e) {
      expect(e).toEqual(error);
    }
  });
});
