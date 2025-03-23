import { generateSetting, isSettingAreaFocused, focusOnSetting, removeSettingFocus, settingStateMgr } from "../../components/settings/setting";
import { generateThemeSwitch } from "../../components/settings/themeSwitch";


jest.mock("../../components/settings/themeSwitch", () => ({
    generateThemeSwitch: jest.fn(() => ({
        selector: "theme-switch-btn",
        element: document.createElement("button"),
        onclick: jest.fn(),
    })),
}));

describe("generateSetting", () => {
    let settingEl: HTMLElement;
    let mockOnSettingChange: jest.Mock;

    beforeEach(() => {
        mockOnSettingChange = jest.fn();
        settingEl = generateSetting(mockOnSettingChange);
        document.body.appendChild(settingEl);
    });

    afterEach(() => {
        document.body.innerHTML = "";
        jest.clearAllMocks();
    });

    it("should create the settings container", () => {
        expect(settingEl).toBeInstanceOf(HTMLDivElement);
        expect(settingEl.classList.contains("setting-container")).toBeTruthy();
    });

    it("should render the theme switch button", () => {
        expect(generateThemeSwitch).toHaveBeenCalledWith(mockOnSettingChange);
        expect(settingEl.querySelector("button")).not.toBeNull();
    });

    it("should add focused class when focusOnSetting is called", () => {
        focusOnSetting();
        expect(settingEl.classList.contains("focused")).toBeTruthy();
    });

    it("should remove focused class when removeSettingFocus is called", () => {
        focusOnSetting();
        removeSettingFocus();

        expect(settingEl.classList.contains("focused")).toBeFalsy();
    });

    it("should detect if setting area is focused", () => {
        expect(isSettingAreaFocused()).toBeFalsy();
        focusOnSetting();

        expect(isSettingAreaFocused()).toBeTruthy();
    });
});