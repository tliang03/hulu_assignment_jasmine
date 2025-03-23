
import { ItemType, LevelEnum, CARD_IMG_SIZE_MAP_H, CARD_IMG_SIZE_MAP_V, ThemeTypeEnum } from "../../types";

//Function to render image on given element as background
export const renderImage = (item: ItemType, parentElement: HTMLDivElement, level: LevelEnum, themeValue?: ThemeTypeEnum) => {

	//Handle theme switch
	themeValue = themeValue || ThemeTypeEnum.HORIZONTAL;
	const tilePath = themeValue === ThemeTypeEnum.HORIZONTAL ? 'horizontal_tile' : 'vertical_tile';
	const sizeMap = themeValue === ThemeTypeEnum.HORIZONTAL ? CARD_IMG_SIZE_MAP_H :  CARD_IMG_SIZE_MAP_V;

	const size = sizeMap[level];
	
	//When larger image fail to load, load small size as fallback
	const fallbackSize = level !== LevelEnum.S ? sizeMap[LevelEnum.S] : undefined;

	const srcPath = item.visuals?.artwork?.[tilePath].image?.path;
	const imagePath = srcPath + '&size=' + size + '&format=jpeg';
	const fallbackImagePath = fallbackSize ? srcPath + '&size=' + fallbackSize + '&format=jpeg' : null;

	//Function to load image and give ability to load alternate
	const loadImage = (path: string) => {
		
		const bgImg = new Image();

		bgImg.src = path;

		//Handler when success load
		bgImg.onload = () => {
			
			parentElement.style.backgroundImage = `url(${path})`;
		};

		//Handler when image load onerror
		bgImg.onerror = function (e: Event |string) {

			//If failed, try load fallback image available
			if(fallbackImagePath && path !== fallbackImagePath) {

				console.log(`Downgrade to smaller image - ${item.id} - ${fallbackImagePath}`);

				loadImage(fallbackImagePath);

				return;
			}

			console.log(`Set to default image instead - ${item.id}`);

			//If no fallback image / even fallback image failed, use logo as default image
			const defaultSrc = item.visuals.primary_branding?.artwork["brand.watermark"].path;

			if(defaultSrc) {
				parentElement.style.backgroundImage = `url(${defaultSrc}&size=${size}&format=jpeg)`;
			}
		};
	}

	loadImage(imagePath);

	//Add water mark to image
	const waterMarkElement = document.createElement('div');
	waterMarkElement.classList.add('watermark');

	const watermarkSrc = item.visuals.primary_branding?.artwork["brand.watermark.bottom.right"].path;

	if(watermarkSrc) {
		waterMarkElement.style.backgroundImage = `url(${watermarkSrc}&size=${sizeMap.WATERMARK}&format=png)`;

		parentElement.appendChild(waterMarkElement);
	}
	
}