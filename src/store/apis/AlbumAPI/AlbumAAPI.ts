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

export type TImage = {
	id: number;
	url: string;
	createdAt: string;
	updatedAt: string;
	albumId: number;
};
type TResponse<T> = T[];
const AlbumAAPI = createApi({
	reducerPath: 'albums',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3000',
	}),
	tagTypes: ['Album', 'UserAlbums', 'Image'],
	endpoints: (builder) => ({
		fetchAlbums: builder.query<TResponse<TAlbum>, TUser>({
			providesTags: (result, _error, arg) => {
				const tags = result && result.map(({ id }) => ({ type: 'Album', id }));
				if (tags) {
					return [...tags, { type: 'UserAlbums', id: arg?.id }];
				}
				return [{ type: 'UserAlbums', id: arg?.id }];
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
						type: 'UserAlbums',
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
			invalidatesTags: (_result, _error, arg) => {
				return [
					{
						type: 'Album',
						id: arg?.id,
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
		fetchImagesByAlbumId: builder.query<TResponse<TImage>, TAlbum>({
			providesTags: (result, _error, album) => {
				const tags = result && result.map(({ id }) => ({ type: 'Image', id }));
				if (tags) {
					return [...tags, { type: 'Album', id: album.id }];
				}
				return [{ type: 'Album', id: album.id }];
			},
			query(album) {
				return {
					url: `/image/${album.id}`,
					method: 'GET',
				};
			},
			transformResponse: (rawResult: { data: TImage[] }) => {
				toast.success('Images fetched');
				return rawResult.data;
			},
		}),
		addImagesToAlbum: builder.mutation<TImage, TAlbum>({
			invalidatesTags: (_result, _error, album) => {
				return [
					{
						type: 'Album',
						id: album.id,
					},
				];
			},
			query: (album) => {
				return {
					url: '/image',
					method: 'POST',
					body: {
						url: faker.image.abstract(150, 150, true),
						albumId: album.id,
					},
				};
			},
			transformResponse: (rawResult: { data: TImage }) => {
				toast.success('Images added to album');
				return rawResult.data;
			},
		}),
		removeImageById: builder.mutation<TImage, TImage>({
			invalidatesTags: (_result, _error, image) => {
				return [
					{
						type: 'Image',
						id: image.id,
					},
				];
			},
			query: (image) => {
				return {
					url: `/image/${image.id}`,
					method: 'DELETE',
				};
			},
			transformResponse: (rawResult: { data: TImage }) => {
				return rawResult.data;
			},
		}),
	}),
});

export const {
	useFetchAlbumsQuery,
	useAddAlbumMutation,
	useRemoveAlbumMutation,
	useAddImagesToAlbumMutation,
	useRemoveImageByIdMutation,
	useFetchImagesByAlbumIdQuery,
} = AlbumAAPI;
export { AlbumAAPI };
