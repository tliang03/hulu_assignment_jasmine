import { HubRespType } from "../types";
import { generateCollectionList } from "./collections/list";
import { generateModal, isModalOpen, resetModal } from "./modal";
import { focusOnSetting, generateSetting, isSettingAreaFocused, removeSettingFocus } from "./settings/setting";

const SCROLL_TO_VIEW_V_PROPS = {
	behavior: "smooth",
	block: "center",
	inline: "nearest"

} as ScrollIntoViewOptions;

const SCROLL_TO_VIEW_H_PROPS = {
	behavior: "smooth",
	block: "nearest",
	inline: "center"

} as ScrollIntoViewOptions;

//Keep out of function to remember position when theme change
let curRow = 0;
let curCol = 0;

//To avoid re-register event handler
let isEventAttached = false;


//Function to generate collection list and handlers for user interactions
export const generateMainContainer = (hubData: HubRespType) => {

	const containerDiv = document.createElement('div');
	containerDiv.classList.add('main-wrapper');

	let components = hubData.components;

	//Function to render collection list
	const renderList = () => {
		
		//re-render list after change theme
		const list = generateCollectionList(hubData, (rowIdx, newCollection) =>{
			
			components[rowIdx] = newCollection;

			if(rowIdx === curRow) {
				updateFocus();
			}
		});

		containerDiv.append(...list);
	}

	containerDiv.appendChild(generateSetting(() => {
		renderList();
	}));

	renderList();

	//Fuction to update focused image and set focused tile into view
	const updateFocus = (scrollProps?: ScrollIntoViewOptions) => {
		
		document.querySelectorAll('.tile').forEach(tile => tile.classList.remove("focused"));

		const cardEl = document.querySelector(`[data-row="${curRow}"]`)?.querySelector(`[data-tile="${curCol}"]`);

		if(cardEl) {
			cardEl.classList.add('focused');

			cardEl.scrollIntoView(scrollProps || SCROLL_TO_VIEW_H_PROPS);

			//When nav to top, make sure it scroll screen to very top
			if (curRow === 0) {
				containerDiv?.scrollTo?.({ top: 0, behavior: 'smooth' })
			}
		}
	}

	//Initial focus
	setTimeout(() => {
		updateFocus();
	}, 100);

	//Function to calculate the related column index when nav to different row
	const getNextCol = (rIdx: number, nextRIdx: number) => {
		
		const curItems = document.querySelector(`[data-row="${rIdx}"]`)?.querySelectorAll('.card');

		let relativeIdx = 0;

		curItems?.forEach((node, nodeIdx) => {	
			if(nodeIdx < curCol) {
				const rect = node.getBoundingClientRect();

				const isInView = rect.left >= 0 && rect.right <= window.innerWidth;

				if(isInView){
					relativeIdx += 1;
				}
			}
		})

		const nextItems = document.querySelector(`[data-row="${nextRIdx}"]`)?.querySelectorAll('.card');

		let nextFirstInViewPos = -1;

		nextItems?.forEach((node, idx) => {
			
			if(nextFirstInViewPos === -1) {
				const rect = node.getBoundingClientRect();

				const isInView = rect.left >= 0 && rect.right <= window.innerWidth;

				if(isInView) {
					nextFirstInViewPos = idx;
				}
			}
		});

		return relativeIdx > -1 && nextFirstInViewPos > -1 ? relativeIdx + nextFirstInViewPos : curCol
	}




	//Keyboard event handlers
	//Event handler for keyboard events for navigation
	const handleOnKeydown = (e: KeyboardEvent) => {

		if(isModalOpen()) return;
		if(e.key !== 'ArrowDown' && isSettingAreaFocused()) return;

		let scrollProps = SCROLL_TO_VIEW_H_PROPS;

		if(e.key === 'ArrowRight') {

			if((curCol + 1) < components[curRow]?.items.length) {
				curCol += 1;
			} else {
				curCol = 0;
			}

		} else if(e.key === 'ArrowLeft') {
			
			if((curCol - 1) > -1) {
				curCol -= 1;
			} else {
				curCol = components[curRow]?.items.length - 1;
			}

		} else if(e.key === 'ArrowUp') {
			
			const nextRow = curRow - 1;

			if(nextRow > -1) {
				curCol = getNextCol(curRow, nextRow);

			} else {
				focusOnSetting();
			}

			curRow = nextRow;

			scrollProps = SCROLL_TO_VIEW_V_PROPS;

		} else if(e.key === 'ArrowDown') {

			const nextRow = curRow + 1;

			if(curRow === -1) {
				removeSettingFocus();

				curRow = nextRow;

			} else if(nextRow < components.length) {

				//When row not fetched and has empty items, scroll collection into view to trigger data fetch
				if(!components[nextRow].items.length) {
					document.querySelector(`[data-row="${nextRow}"]`)?.scrollIntoView(SCROLL_TO_VIEW_V_PROPS);
				} else {
					curCol = getNextCol(curRow, nextRow);
				}

				curRow = nextRow;
			} 

			scrollProps = SCROLL_TO_VIEW_V_PROPS;
		}

		updateFocus(scrollProps);
	}

	//Event handler for keyboard events for modal. Enter to open and Backspace or Escape to close modal
	const handleOnKeyup = (e: KeyboardEvent) => {

		e.preventDefault();
		e.stopPropagation();

		if(isSettingAreaFocused()) return;

		const curItem = components[curRow].items[curCol];

		if(curItem) {

			if(e.key === 'Enter') {

				resetModal();
				document.body.append(...generateModal(curItem));

			} else if(e.key === 'Backspace' || e.key === 'Escape') {
				resetModal();
			}
		}

	}

	//Ensure event attached once
	if (!isEventAttached) {
        document.addEventListener('keydown', handleOnKeydown);
        document.addEventListener('keyup', handleOnKeyup);
        isEventAttached = true;
    }

	return containerDiv;
}