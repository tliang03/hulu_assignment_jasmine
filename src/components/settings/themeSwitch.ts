import { SettingItemType, ThemeTypeEnum } from "../../types";
import { settingStateMgr } from "./setting";

//Function to render theme switch button
export const generateThemeSwitch = (onSettingChange?: () => void) => {

	let val = settingStateMgr.getThemveValue();

	const btnEl = document.createElement('button');
	btnEl.classList.add('theme-switch-btn', 'setting-button');

	//Function to get new text
	const getButtonText = (val: ThemeTypeEnum) => {
		return val === ThemeTypeEnum.HORIZONTAL ? 'Horizontal' : 'Vertical';
	}

	const onButtonClick = () => {

		const newVal = val === ThemeTypeEnum.HORIZONTAL ? ThemeTypeEnum.VERTICAL : ThemeTypeEnum.HORIZONTAL;
		val = newVal;

		//Change theme text on button
		btnEl.innerText = getButtonText(newVal);

		settingStateMgr.setThemeValue(newVal);

		onSettingChange?.();
	}

	btnEl.innerText = getButtonText(val);

	return {
		selector: 'theme-switch-btn',
		element: btnEl,
		onclick: onButtonClick
	} as SettingItemType;
}