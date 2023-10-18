import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TUser } from '../../thunks/type.ts';
import { faker } from '@faker-js/faker';
import { toast } from 'sonner';
export type TAlbum = {
	id: number;
	name: string;
	createdAt: string;
	updatedAt: string;
	userId: number;
};
type TResponse<T> = T[];
const AlbumAAPI = createApi({
	reducerPath: 'albums',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3000',
	}),
	tagTypes: ['Album'],
	endpoints: (builder) => ({
		fetchAlbums: builder.query<TResponse<TAlbum>, TUser>({
			providesTags: (_result, _error, arg) => {
				return [
					{
						type: 'Album',
						id: arg?.id,
					},
				];
			},
			query: (userId) => {
				return {
					url: '/album',
					method: 'GET',
					params: {
						userId: userId.id,
					},
				};
			},
			transformResponse: (rawResult: { data: TResponse<TAlbum> }) => {
				toast.success('Albums fetched');
				return rawResult.data;
			},
		}),
		addAlbum: builder.mutation<TAlbum, TUser>({
			invalidatesTags: (_result, _error, arg) => {
				return [
					{
						type: 'Album',
						id: arg?.id,
					},
				];
			},
			query: (user) => {
				return {
					url: '/album',
					method: 'POST',
					body: {
						userId: user.id,
						name: faker.commerce.productName(),
					},
				};
			},
			transformResponse: (rawResult: { data: TAlbum }) => {
				toast.success('Album added');
				return rawResult.data;
			},
		}),
		removeAlbum: builder.mutation<TAlbum, TAlbum>({
			invalidatesTags: (result) => {
				return [
					{
						type: 'Album',
						id: result?.userId,
					},
				];
			},
			query: (album) => {
				return {
					url: `/album/${album.id}`,
					method: 'DELETE',
				};
			},
			transformResponse: (rawResult: { data: TAlbum }) => {
				toast.success('Album removed');
				return rawResult.data;
			},
		}),
	}),
});

export const {
	useFetchAlbumsQuery,
	useAddAlbumMutation,
	useRemoveAlbumMutation,
} = AlbumAAPI;
export { AlbumAAPI };
