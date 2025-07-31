export interface ILogin {
	email: string;
	password: string;
}
export interface IUserData {
	name: string;
	email: string;
	password: string;
}

export interface IBaseResponse<T> {
	status?: number;
	error?: string;
	data: T | null;
}
