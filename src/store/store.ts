import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './slices/userSlice/userSlice.ts';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const store = configureStore({
	reducer: {
		user: userSlice.reducer,
	},
});
export { store };
export * from '../store/thunks/fetchUsers.ts';
export * from '../store/thunks/adduser.ts';
export * from '../store/thunks/deleteUser.ts';
export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
