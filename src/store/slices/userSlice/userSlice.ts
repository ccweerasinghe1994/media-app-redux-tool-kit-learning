import { createSlice } from '@reduxjs/toolkit';
import { USER_INITIAL_STATE } from './initialState.ts';
import { fetchUsers } from '../../thunks/fetchUsers.ts';
import { toast } from 'sonner';
import { adduser } from '../../thunks/adduser.ts';
import { deleteUser } from '../../thunks/deleteUser.ts';

const userSlice = createSlice({
	name: 'user',
	initialState: USER_INITIAL_STATE,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchUsers.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchUsers.fulfilled, (state, action) => {
			state.data = action.payload;
			state.loading = false;
			toast.success('Users fetched successfully');
		});
		builder.addCase(fetchUsers.rejected, (state, action) => {
			state.error = action.error.message;
			state.loading = false;
			toast.error(action.error.message);
		});
		builder.addCase(adduser.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(adduser.fulfilled, (state, action) => {
			state.data.push(action.payload);
			state.loading = false;
			toast.success('User added successfully');
		});
		builder.addCase(adduser.rejected, (state, action) => {
			state.error = action.error.message;
			state.loading = false;
			toast.error(action.error.message);
		});
		builder.addCase(deleteUser.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(deleteUser.fulfilled, (state, action) => {
			state.data = state.data.filter((user) => user.id !== action.payload.id);
			state.loading = false;
			toast.success('User deleted successfully');
		});
		builder.addCase(deleteUser.rejected, (state, action) => {
			state.error = action.error.message;
			state.loading = false;
			console.error(action.error.message);
			toast.error('Error deleting user');
		});
	},
});

export { userSlice };
