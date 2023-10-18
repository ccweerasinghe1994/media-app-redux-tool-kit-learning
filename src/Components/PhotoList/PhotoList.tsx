import { FC, ReactNode } from 'react';
import {
	TAlbum,
	useAddImagesToAlbumMutation,
	useFetchImagesByAlbumIdQuery,
} from '../../store/apis/AlbumAPI/AlbumAAPI.ts';
import { toast } from 'sonner';
import Button from '../Button/Button.tsx';
import ImageListItem from '../ImageListItem/ImageListItem.tsx';

type TPhotoListProps = {
	album: TAlbum;
};

const PhotoList: FC<TPhotoListProps> = ({ album }) => {
	const [addPhoto, results] = useAddImagesToAlbumMutation();
	const { data, isFetching, isError } = useFetchImagesByAlbumIdQuery(album);

	const handleClick = () => {
		void addPhoto(album);
	};

	let content: ReactNode;

	if (isFetching) {
		return (
			<div
				className={
					'animate-pulse flex flex-wrap justify-center items-center gap-3 my-4'
				}>
				<div className={'bg-white/20 shadow-2xl rounded w-[150px] h-[150px]'} />
				<div className={'bg-white/20 shadow-2xl rounded w-[150px] h-[150px]'} />
				<div className={'bg-white/20 shadow-2xl rounded w-[150px] h-[150px]'} />
				<div className={'bg-white/20 shadow-2xl rounded w-[150px] h-[150px]'} />
				<div className={'bg-white/20 shadow-2xl rounded w-[150px] h-[150px]'} />
				<div className={'bg-white/20 shadow-2xl rounded w-[150px] h-[150px]'} />
			</div>
		);
	}
	if (isError) {
		return toast.error('Error fetching photos');
	}
	if (data) {
		content = data?.map((photo) => {
			return <ImageListItem photo={photo} key={photo.id} />;
		});
	}

	return (
		<div>
			<div className={'flex justify-between px-5  mt-4 text-xl'}>
				<div>photos for {album.name} album </div>
				<Button onClick={handleClick}>add Image</Button>
			</div>
			<div className={'flex gap-3 px-5 my-5 flex-wrap justify-center'}>
				{content}
			</div>
		</div>
	);
};

export default PhotoList;
