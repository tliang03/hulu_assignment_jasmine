import { CollectionType } from "src/types";
import { collectionByIdUrl } from "../declarations";
import { fetchResp } from "./main";

type SvcOptionType = {
	onSuccess?: (collection: CollectionType) => void,
	onError?: () => void,
}

//Action to fetch collection data by collection id
export const fetchCollectionById = async (id: string, options: SvcOptionType) => {

	const url = collectionByIdUrl.replace('<id>', id);

	fetchResp(url).then((data) => {

		const {onSuccess, onError} = options;

		if(data) {
			onSuccess?.(data);
			
		} else {
			onError?.();
		}
	})

}