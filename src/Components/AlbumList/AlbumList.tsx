import { FC } from 'react';
import { TUser } from '../../store/thunks/type.ts';

type TAlbumListProps = {
	user: TUser;
};

const AlbumList: FC<TAlbumListProps> = ({ user }) => {
	return <div className={'px-10'}>{user.name} albums</div>;
};

export default AlbumList;
