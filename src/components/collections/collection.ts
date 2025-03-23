import { fetchCollectionById } from "../../actions/fetchCollectionById";
import { CollectionType, ItemType } from "../../types";
import { settingStateMgr } from "../settings/setting";
import { generateTile } from "./tile";

//Function to render each collection
export const generateCollection = (
	collection: CollectionType, 
	rowIdx: number,
	updateCollection: (newColl: CollectionType) => void
) => {

	const {name} = collection;
	const themeValue = settingStateMgr.getThemveValue();

	let items = collection.items;
	
	//Collection wrapper
	const collElement = document.createElement('div');
	collElement.classList.add('collection-container');
	collElement.setAttribute('data-row', rowIdx.toString());
	
	//Title element for collection
	const titleElement = document.createElement('div');
	titleElement.classList.add('title');

	titleElement.innerHTML = name;

	collElement.appendChild(titleElement);

	//Scrollable wrpper for tiles
	const scrollableWrapper = document.createElement('div');
	scrollableWrapper.classList.add('scrolling-collection-container', themeValue);

	//Function to append empty message when collection has no items
	const appendEmptyMsg = () => {

		//reset any existings
		collElement.querySelector('.empty-msg')?.remove();
		
		const emptyMsgEl = document.createElement('div');

		emptyMsgEl.classList.add('empty-msg');

		emptyMsgEl.innerHTML = 'No Content Available';

		scrollableWrapper.appendChild(emptyMsgEl);
	}

	//Function to append append tiles to scrollable wrapper
	const appendTiles = (arr: ItemType[]) => {

		collElement.querySelector('.empty-msg')?.remove();

		if(arr.length) {
			const tileEl = [] as HTMLElement[];

			arr.forEach((item: ItemType, itemIdx: number) => {
				tileEl.push(generateTile(item, itemIdx));
			})
	
			scrollableWrapper.append(...tileEl);
		} else  {
			appendEmptyMsg();
		}
		
	}

	if(items.length) {
		//Append tiles when available
		appendTiles(items);

	} else {
		
		//Append prefilled empty message when no items available. Then observe when collection is in view
		appendEmptyMsg();

		const observer = new IntersectionObserver(entries => {
			
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					
					//Fetch collection by id when in view

					fetchCollectionById(collection.id, {
						
						onSuccess: (resp: CollectionType) => {

							appendTiles(resp.items);

							updateCollection(resp);

							//When already fetched, no need to observe intersection anymore
							observer.unobserve(collElement);
						},
						onError: () => {

							//Append empty message when error happens
							appendEmptyMsg();
						}
					});
				}
			});
		}, { threshold: 0.5 });

		//observe current collection element
		observer.observe(collElement);
	}

	collElement.appendChild(scrollableWrapper);

	return collElement;
}