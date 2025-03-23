
import { ItemType, LevelEnum, ThemeTypeEnum } from "../../types";
import { renderImage } from "../common/image";
import { settingStateMgr } from "../settings/setting";
import { generateSummary } from "../common/summary";

//Function to generate tile element
export const generateTile = (item: ItemType, idx: number) => {

	const themeValue = settingStateMgr.getThemveValue();
	
	//Tile wrapper
	const tileElement = document.createElement('div');
	tileElement.classList.add('tile', themeValue);
	tileElement.setAttribute('data-tile', idx.toString());

	//Card element for image
	const cardElement = document.createElement('div');
	cardElement.classList.add('card');

	renderImage(item, cardElement, LevelEnum.S, themeValue);

	tileElement.appendChild(cardElement);

	//Summary 
	const summaryEl = generateSummary(item);

	//Detail. Show only when focused
	const detailElement = document.createElement('div');
	detailElement.classList.add('detail');

	const titleElement = document.createElement('div');
	titleElement.classList.add('detail-title');

	const tilePath = themeValue === ThemeTypeEnum.HORIZONTAL ? 'horizontal_tile' : 'vertical_tile';

	titleElement.innerHTML = item.visuals.artwork?.[tilePath]?.text;

	detailElement.appendChild(titleElement);
	detailElement.appendChild(summaryEl);

	tileElement.appendChild(detailElement);

	return tileElement;
}