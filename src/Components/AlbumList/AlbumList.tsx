import { FC, ReactNode } from 'react';
import { TUser } from '../../store/thunks/type.ts';
import {
	TAlbum,
	useAddAlbumMutation,
	useFetchAlbumsQuery,
} from '../../store/apis/AlbumAPI/AlbumAAPI.ts';
import { toast } from 'sonner';
import Skeleton from '../Skeleton/Skeleton.tsx';
import Button from '../Button/Button.tsx';
import AlbumListItem from '../AlbumListItem/AlbumListItem.tsx';

type TAlbumListProps = {
	user: TUser;
};

const AlbumList: FC<TAlbumListProps> = ({ user }) => {
	const { data: albumList, isFetching, error } = useFetchAlbumsQuery(user);
	const [addAlbum, response] = useAddAlbumMutation();
	const { isLoading } = response;

	const handleClick = () => {
		void addAlbum(user);
	};
	let content: ReactNode;

	if (isFetching) {
		content = <Skeleton times={1} />;
	}
	if (error) {
		toast.error('Error fetching albums');
		content = <div>Error fetching albums</div>;
	}
	if (albumList && albumList?.length === 0) {
		toast.success('No albums found');
		content = <div className={'text-gray-200'}>No albums found</div>;
	}
	if (albumList && albumList?.length > 0) {
		content = albumList.map((album: TAlbum) => (
			<AlbumListItem key={album.id} album={album} />
		));
	}
	return (
		<div
			className={'transition-all backdrop-blur-md rounded bg-red-600/20 pb-10'}>
			<div
				className={
					'flex justify-between font-bold text-2xl text-slate-200 pt-4 px-4'
				}>
				<div className={''}>Albums For {user.name}</div>
				<Button
					className={''}
					loading={isLoading}
					type={'success'}
					onClick={handleClick}>
					Add Album
				</Button>
			</div>
			{content}
		</div>
	);
};

export default AlbumList;
