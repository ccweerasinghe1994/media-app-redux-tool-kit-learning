export type TUser = {
	id: number;
	name: string;
	createdAt: string;
	updatedAt: string;
};

export type TUserResponse = {
	data: TUser[];
};

export type TUserDeleteResponse = {
	data: TUser;
};
