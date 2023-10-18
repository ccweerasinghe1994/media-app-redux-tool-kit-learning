import { useEffect, ReactNode } from 'react';
import { adduser, fetchUsers, useAppSelector } from '../../store/store.ts';
import Skeleton from '../Skeleton/Skeleton.tsx';
import Button from '../Button/Button.tsx';
import { toast } from 'sonner';
import { useThunk } from '../../store/hooks/useThunk.ts';
import UserListItem from '../UserListItem/UserListItem.tsx';

const UserList = () => {
	const [doFetchUsers, isUserListLoading, userListError] = useThunk(fetchUsers);
	const [doAdduser, isAddingUserLoading, addingUserError] = useThunk(adduser);
	const { data: userList } = useAppSelector((state) => state.user);
	useEffect(() => {
		doFetchUsers();
	}, [doFetchUsers]);

	const handleAddUser = () => {
		void doAdduser();
	};
	let content: ReactNode;
	if (isUserListLoading) {
		content = <Skeleton className={'h-10'} times={10} />;
	} else if (userListError) {
		toast.error('Error Fetching Data');
		content = <div>Error Fetching Data</div>;
	} else if (!userList) {
		content = <div>No data</div>;
	} else if (userList) {
		content = userList.map((user) => (
			<UserListItem key={user.id} user={user} />
		));
	}
	return (
		<>
			<div
				className={
					'flex flex-row justify-between items-center px-10 py-3 backdrop-blur-sm bg-white/30 shadow-xl'
				}>
				<h1 className={'m-2 text-4xl font-mono tracking-wide text-gray-100'}>
					Users
				</h1>

				<Button
					loading={isAddingUserLoading}
					onClick={handleAddUser}
					type={'danger'}
					size={'large'}
					className={'px-8 py-5'}>
					+ Add User
				</Button>
			</div>

			{addingUserError && (
				<div className={'text-red-500'}>Error adding user</div>
			)}

			{content}
		</>
	);
};

export default UserList;
