import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './slices/userSlice/userSlice.ts';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import logger from 'redux-logger';
import { AlbumAAPI } from './apis/AlbumAPI/AlbumAAPI.ts';
import { setupListeners } from '@reduxjs/toolkit/query';
const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		[AlbumAAPI.reducerPath]: AlbumAAPI.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(AlbumAAPI.middleware, logger),
});

setupListeners(store.dispatch);

export { store };
export * from '../store/thunks/fetchUsers.ts';
export * from '../store/thunks/adduser.ts';
export * from '../store/thunks/deleteUser.ts';
export * from '../store/apis/AlbumAPI/AlbumAAPI.ts';
export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
