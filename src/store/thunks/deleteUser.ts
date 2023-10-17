import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { TUserDeleteResponse } from './type.ts';

const deleteUser = createAsyncThunk('users/deleteUser', async (id: number) => {
	const response: AxiosResponse<TUserDeleteResponse> = await axios.delete(
		`http://localhost:3000/media/${id}`,
	);
	return response.data.data;
});

export { deleteUser };
