import { useEffect, ReactNode } from 'react';
import {
	adduser,
	fetchUsers,
	useAppDispatch,
	useAppSelector,
} from '../../store/store.ts';
import Skeleton from '../Skeleton/Skeleton.tsx';
import Button from '../Button/Button.tsx';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { AsyncThunk } from '@reduxjs/toolkit';
import { useThunk } from '../../store/hooks/useThunk.ts';
import UserListItem from '../UserListItem/UserListItem.tsx';

const UserList = () => {
	const [doFetchUsers, isUserListLoading, userListError] = useThunk(fetchUsers);
	const [doAdduser, isAddingUserLoading, addingUserError] = useThunk(adduser);
	const { data } = useAppSelector((state) => state.user);
	useEffect(() => {
		doFetchUsers();
	}, [doFetchUsers]);

	const handleAddUser = () => {
		doAdduser();
	};
	let content: ReactNode;
	if (isUserListLoading) {
		content = <Skeleton className={'h-10 w-full'} times={10} />;
	} else if (userListError) {
		toast.error('Error Fetching Data');
		content = <div>Error Fetching Data</div>;
	} else if (!data) {
		content = <div>No data</div>;
	} else if (data) {
		content = data.map((user) => <UserListItem key={user.id} user={user} />);
	}
	return (
		<div>
			<div className={'flex flex-row justify-between m-3'}>
				<h1 className={'m-2 text-xl'}>Users</h1>

				<Button
					loading={isAddingUserLoading}
					onClick={handleAddUser}
					type={'primary'}
					size={'large'}>
					+ Add User
				</Button>
			</div>

			{addingUserError && (
				<div className={'text-red-500'}>Error adding user</div>
			)}

			{content}
		</div>
	);
};

export default UserList;
