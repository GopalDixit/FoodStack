const baseUrl = 'https://foodstack-xp5k.onrender.com/api';

export const loginUser = async (credentials) => {
  const response = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) throw new Error('Login failed');
  return await response.json();
};

export const signupUser = async (userData) => {
  const response = await fetch(`${baseUrl}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error('Signup failed');
  return await response.json();
};

export const getAllFoods = async () => {
  const response = await fetch(`${baseUrl}/food`);
  const data = await response.json();
  return data;
};

export const addFood = async (food) => {
  const response = await fetch(`${baseUrl}/food/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(food),
  });
  return response.json();
};
