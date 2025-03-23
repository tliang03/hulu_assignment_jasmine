import { ItemType, LevelEnum } from "../types";
import { renderImage } from "./common/image";
import { generateSummary } from "./common/summary";

//Function to generate modal element with overlay
export const generateModal = (item: ItemType) => {

	const modalEl = document.createElement('div');
	const modalOverlayEl = document.createElement('div');

	modalEl.classList.add('modal');
	modalOverlayEl.classList.add('modal-overlay');

	//Render large image for modal display
	renderImage(item, modalEl, LevelEnum.L);

	//Render gradient wrapper div to display tile detail info
	const wrapperDiv = document.createElement('div');
	wrapperDiv.classList.add('modal-detail-wrapper');

	const detailDiv = document.createElement('div');
	detailDiv.classList.add('modal-detail');

	//Render title
	const headline = item.visuals.headline;

	const headlineDiv = document.createElement('div');
	headlineDiv.classList.add('headline');

	headlineDiv.innerHTML = headline;

	//Render summary
	const summary = generateSummary(item);

	//Render description 
	const description = item.visuals.body;

	const descriptionDiv = document.createElement('div');
	descriptionDiv.classList.add('info');

	descriptionDiv.innerHTML = description;

	detailDiv.appendChild(headlineDiv);
	detailDiv.appendChild(summary);
	detailDiv.appendChild(descriptionDiv);

	wrapperDiv.appendChild(detailDiv);

	modalEl.appendChild(wrapperDiv);


	//Event handler for keyboard events for scroll description if needed.
	let scrollY = 0;
	document.addEventListener('keydown', (e: KeyboardEvent) => {

		if(!isModalOpen()) return;

		e.preventDefault();
		e.stopPropagation();

		if(e.key === 'ArrowUp') {
			
			scrollY -= 40;

		} else if(e.key === 'ArrowDown') {

			scrollY += 40;
		}

		document.querySelector('.info')?.scroll(0, scrollY);
	});

	return [modalOverlayEl, modalEl];

}

export const isModalOpen = () => {
	return !!(document.querySelector('.modal'));
}

//Function to reset modal
export const resetModal = () => {
	document.querySelector('.modal')?.remove();
	document.querySelector('.modal-overlay')?.remove();
}