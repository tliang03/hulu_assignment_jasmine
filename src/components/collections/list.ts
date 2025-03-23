import { CollectionType, HubRespType, ThemeTypeEnum } from "../../types";
import { generateCollection } from "./collection";

const resetList = () => {
	//Remove all exisitings first before rendering new
	const coll = document.querySelectorAll('.collection-container');

	coll.forEach((el) => {
		el.remove();
	});
}

//Function to generate collection list and handlers for user interactions
export const generateCollectionList = (hubData: HubRespType, onDataChange: (rowIdx: number, coll:CollectionType) => void) => {

	resetList();

	const comListEl = [] as HTMLElement[];

	const components = hubData.components;

	//Populate components
	components.forEach((coll: CollectionType, rowIdx: number) => {

		//When dynamic load happens, update cached data to prevent unnecesary refetch
		const onCollectionChange = (newColl: CollectionType) => {
			
			components[rowIdx] = newColl;

			onDataChange(rowIdx, newColl);

		}

		const collEl = generateCollection(coll, rowIdx, onCollectionChange);

		comListEl.push(collEl);
	});

	
	return comListEl;
}