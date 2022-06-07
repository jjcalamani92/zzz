export interface IUser {
	_id: string;
	email: string;
	role: string;
}

export interface UserS {
	_id      : string;
	username     : string;
	email    : string;
	password?: string;
	role     : string;
	site		: string[];
	status: boolean;
	google: boolean;

	createdAt?: string;
	updatedAt?: string;
}