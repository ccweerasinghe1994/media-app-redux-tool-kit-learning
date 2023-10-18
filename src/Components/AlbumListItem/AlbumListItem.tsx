import { FC } from 'react';
import {
	TAlbum,
	useRemoveAlbumMutation,
} from '../../store/apis/AlbumAPI/AlbumAAPI.ts';
import ExpandablePanel from '../ExpandablePanel/ExpandablePanel.tsx';
import Button from '../Button/Button.tsx';
import { GoTrash } from 'react-icons/go';
import { toast } from 'sonner';
import PhotoList from '../PhotoList/PhotoList.tsx';

type TAlbumListItemProps = {
	album: TAlbum;
	className?: string;
};
const AlbumListItem: FC<TAlbumListItemProps> = ({ album }) => {
	const [removeAlbum, results] = useRemoveAlbumMutation();
	const handleClick = () => {
		void removeAlbum(album);
	};

	if (results.isError) {
		return toast.error('Error deleting album');
	}

	const header = (
		<div className={'text-gray-200 flex'}>
			<Button onClick={handleClick} className={'border-0'}>
				<GoTrash className={'text-2xl text-red-600 font-bold'} />
			</Button>
			{album.name} Albums
		</div>
	);
	return (
		<ExpandablePanel
			className={'w-3/4 mx-auto mt-10 py-1 border border-amber-600 shadow-xl'}
			key={album.id}
			header={header}>
			<div className={'font-light text-gray-200'}>
				<PhotoList album={album} />
			</div>
		</ExpandablePanel>
	);
};

export default AlbumListItem;
