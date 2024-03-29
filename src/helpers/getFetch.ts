import axios from "axios";
import { url } from "@/connections/mainApi";

export let getFetch = async (path: string) => {
	try {
		const token = localStorage.getItem("rt__importadora"); // Obteniendo el token JWT del localStorage
		const headers = {
			Authorization: `Bearer ${token}`,
		};
		const resp = await axios.get(`${url}${path}`, { headers });
		return resp;
	} catch (error) {
		console.error(error);
	}
};
