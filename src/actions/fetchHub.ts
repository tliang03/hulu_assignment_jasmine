import { HubRespType } from "../types";
import { hubDataUrl } from "../declarations";
import { fetchResp } from "./main";

type SvcOptionType = {
	onSuccess: (resp: HubRespType) => void,
	onError: () => void,
}

//Action to fetch hub data
export const fetchHub = async (options: SvcOptionType) => {

	fetchResp(hubDataUrl).then((data) => {

		const {onSuccess, onError} = options;

		if(data) {
			onSuccess?.(data);
		} else {
			onError?.();
		}
	});

}