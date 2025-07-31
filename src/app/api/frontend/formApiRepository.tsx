import { ILogin } from "@/app/models/interface/auth";
import { AxiosInstance } from "axios";
import $http from "./axios";

class FormApiRepository {
	constructor(private $http: AxiosInstance) {
		this.$http = $http;
	}

	postLoginForm(payload: ILogin) {
		return this.$http.post("/auth/login", payload);
	}
	getLoginUser(u_id: string | undefined) {
		return this.$http.get(`/users/${u_id}`, {
			params: {},
			validateStatus: () => true,
		});
	}
}

const formApiRepository = new FormApiRepository($http);
export default formApiRepository;
