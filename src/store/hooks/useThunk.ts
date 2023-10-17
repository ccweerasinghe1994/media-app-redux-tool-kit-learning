import { useState, useCallback } from 'react';
import { useAppDispatch } from '../store.ts';
import { AsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

export const useThunk = (thunk: any): [any, boolean, string | undefined] => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>();
	const dispatch = useAppDispatch();
	const handleThunk = useCallback(() => {
		setIsLoading(true);
		void dispatch(thunk())
			.unwrap()
			.catch((error) => {
				if (error instanceof AxiosError) {
					setError(error.message);
				}
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [thunk, dispatch]);
	return [handleThunk, isLoading, error];
};
