import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { faker } from '@faker-js/faker';
import { TUser } from './type.ts';

const adduser = createAsyncThunk('users/adduser', async () => {
	const response: AxiosResponse<{ data: TUser }> = await axios.post(
		'http://localhost:3000/media',
		{
			name: faker.name.fullName(),
		},
	);
	return response.data.data;
});

export { adduser };
