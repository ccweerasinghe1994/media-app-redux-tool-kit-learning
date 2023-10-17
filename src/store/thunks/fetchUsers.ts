import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { TUserResponse } from './type.ts';

const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
	const response: AxiosResponse<TUserResponse> = await axios.get(
		'http://localhost:3000/media',
	);
	await pause(1000);
	return response.data.data;
});

const pause = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export { fetchUsers };
