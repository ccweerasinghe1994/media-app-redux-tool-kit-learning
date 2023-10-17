import { TUser } from '../../thunks/type.ts';

export type TUserState = {
	data: TUser[];
	loading: boolean;
	error: string | undefined;
};
