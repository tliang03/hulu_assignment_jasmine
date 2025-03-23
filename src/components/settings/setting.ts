import { SettingItemType, ThemeTypeEnum } from "../../types";
import { generateThemeSwitch } from "./themeSwitch";

export const settingStateMgr = {
	setting: {
		themeValue: ThemeTypeEnum.HORIZONTAL,
	},

	getThemveValue: function() {
		return this.setting.themeValue
	},

	setThemeValue: function(newValue: ThemeTypeEnum) {
		this.setting.themeValue = newValue;
	}
}

let isEventAttached = false;
let curCol = 0;

export const generateSetting = (onSettingChange?: () => void) => {

	const settingEl = document.createElement('div');
	settingEl.classList.add('setting-container');

	const logoEl = document.createElement('div');
	logoEl.classList.add('logo-text');
	logoEl.innerHTML = 'hulu';

	settingEl.appendChild(logoEl);
	
	const themeSetting = generateThemeSwitch(onSettingChange);

	const settingHandlers: SettingItemType[] = [
		themeSetting
	]

	settingEl.appendChild(themeSetting.element);

	const updateFocus = () => {
		settingEl.querySelector('.focused')?.classList.remove('focused');
		document.querySelector(settingHandlers[curCol]?.selector)?.classList.add('focused')
	}

	setTimeout(() => {
		updateFocus();
	}, 50)

	//Keyboard event handlers
	//Event handler for keyboard events for navigation
	const handleOnKeydown = (e: KeyboardEvent) => {

		if(isSettingAreaFocused()) {
			let nextCol = curCol;

			if(e.key === 'ArrowRight') {
				nextCol += 1;

				if(nextCol < settingHandlers.length ) {
					curCol = nextCol;
				}

			} else if(e.key === 'ArrowLeft') {
				nextCol -= 1;

				if(nextCol > -1) {
					curCol = nextCol;
				}
			}
			
			updateFocus();
		}

	}

	//Event handler for keyboard events for modal. Enter to open and Backspace or Escape to close modal
	const handleOnKeyup = (e: KeyboardEvent) => {

		if(isSettingAreaFocused() && e.key === 'Enter') {
			e.preventDefault();
			e.stopPropagation();

			const curOpt = settingHandlers[curCol];

			curOpt?.onclick?.();
		};

	}

	//Ensure event attached once
	if (!isEventAttached) {

		document.addEventListener('keydown', handleOnKeydown);
        document.addEventListener('keyup', handleOnKeyup);
        isEventAttached = true;
    }

	return settingEl;
}

export const isSettingAreaFocused = () => {
	return !!(document.querySelector('.setting-container')?.classList?.contains('focused'));
}

export const focusOnSetting = () => {
	document.querySelector('.setting-container')?.classList.add('focused');
}

export const removeSettingFocus = () => {
	document.querySelector('.setting-container')?.classList.remove('focused');
}