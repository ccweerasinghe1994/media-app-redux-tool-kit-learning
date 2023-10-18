import { FC } from 'react';
import {
	TImage,
	useRemoveImageByIdMutation,
} from '../../store/apis/AlbumAPI/AlbumAAPI.ts';
import Button from '../Button/Button.tsx';
import { GoTrash } from 'react-icons/go';

type TImageListItemProps = {
	photo: TImage;
};

const ImageListItem: FC<TImageListItemProps> = ({ photo }) => {
	const [deleteImage] = useRemoveImageByIdMutation();
	const handleClick = () => {
		void deleteImage(photo);
	};
	return (
		<div className={'w-[150px] h-[150px] relative'}>
			<img src={photo.url} alt={'test'} />
			<div
				onClick={handleClick}
				className={
					'absolute inset-0 flex justify-center items-center opacity-0 hover:backdrop-blur-sm hover:bg-white/30 transition-all hover:opacity-100'
				}>
				<Button className={'text-5xl border-0'}>
					<GoTrash />{' '}
				</Button>
			</div>
		</div>
	);
};

export default ImageListItem;
