import { FC } from 'react';
import { TUser } from '../../store/thunks/type.ts';
import { GoTrash } from 'react-icons/go';
import Button from '../Button/Button.tsx';
import {
	deleteUser,
	useAppDispatch,
	useAppSelector,
} from '../../store/store.ts';
import ExpandablePanel from '../ExpandablePanel/ExpandablePanel.tsx';
import AlbumList from '../AlbumList/AlbumList.tsx';
const UserListItem: FC<{ user: TUser }> = ({ user }) => {
	const loading = useAppSelector((state) => state.user.loading);
	const dispatch = useAppDispatch();
	const handleDelete = () => {
		void dispatch(deleteUser(user.id));
	};

	const header = (
		<>
			<Button
				className={'border-0 hover:bg-gray-200 rounded-full'}
				loading={loading}
				outlined
				type={'danger'}
				onClick={handleDelete}>
				<GoTrash className={'text-2xl text-red-600 font-bold'} />
			</Button>
			<div className={'p-2'}>{user.name}</div>
		</>
	);
	return (
		<ExpandablePanel header={header}>
			<AlbumList user={user} />
		</ExpandablePanel>
	);
};

export default UserListItem;
