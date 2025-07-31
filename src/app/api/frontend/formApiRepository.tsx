import { AxiosInstance } from "axios";
import $http from "./axios";

class FormApiRepository {
	constructor(private $http: AxiosInstance) {
		this.$http = $http;
	}
}

const formApiRepository = new FormApiRepository($http);
export default formApiRepository;
