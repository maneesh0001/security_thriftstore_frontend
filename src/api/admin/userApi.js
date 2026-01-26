import instance from "../Api";


// Fetch all users
export const getUsers = async () => {
  const response = await instance.get('/users'); // Assumes baseURL is set
  return response.data;
};

// Delete a user by ID
export const deleteUser = async (userId) => {
  const response = await instance.delete(`/users/${userId}`);
  return response.data;
};
