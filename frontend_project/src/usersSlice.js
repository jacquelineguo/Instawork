import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const mockUsers = [
    {
      id: 1,
      firstName: 'Lisa',
      lastName: 'kim',
      email: 'lisa@Instawork.com',
      phone: '451-456-2233',
      isAdmin: true,
    },

    {
      id: 2,
      firstName: 'Jennie',
      lastName: 'kim',
      email: 'jennie@Instawork.com',
      phone: '451-456-2211',
      isAdmin: false,
    },

    {
      id: 3,
      firstName: 'Jisoo',
      lastName: 'k',
      email: 'jisoo@Instawork.com',
      phone: '451-456-2111',
      isAdmin: false,
    }
  ]
  return mockUsers;
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {
    userAdded(state, action) {
      state.entities.push(action.payload);
    },
    userUpdated(state, action) {
      const { id, firstName, lastName, email, phone, isAdmin} = action.payload;
      const existingUser = state.entities.find((user) => user.id === id);
      if (existingUser) {
        existingUser.firstName = firstName;
        existingUser.lastName = lastName;
        existingUser.phone = phone
        existingUser.email = email;
        existingUser.isAdmin = isAdmin;
      }
    },
    userDeleted(state, action) {
      const { id } = action.payload;
      const existingUser = state.entities.find((user) => user.id === id);
      if (existingUser) {
        state.entities = state.entities.filter((user) => user.id !== id);
      }
    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.entities = [...state.entities, ...action.payload];
    },
    [fetchUsers.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { userAdded, userUpdated, userDeleted } = usersSlice.actions;

export default usersSlice.reducer;