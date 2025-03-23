
import { ThemeTypeEnum, SettingItemType } from "../../types";
import { generateThemeSwitch } from "../../components/settings/themeSwitch";
import { settingStateMgr } from "../../components/settings/setting";

jest.mock("../../components/settings/setting", () => ({
    settingStateMgr: {
        getThemveValue: jest.fn(),
        setThemeValue: jest.fn()
    }
}));

describe("generateThemeSwitch", () => {
    let themeSwitch: SettingItemType;
    let mockOnSettingChange: jest.Mock;

    beforeEach(() => {
        mockOnSettingChange = jest.fn();
        (settingStateMgr.getThemveValue as jest.Mock).mockReturnValue(ThemeTypeEnum.HORIZONTAL);

        themeSwitch = generateThemeSwitch(mockOnSettingChange);
        document.body.appendChild(themeSwitch.element);
    });

    afterEach(() => {
        document.body.innerHTML = "";
        jest.clearAllMocks();
    });

    it("should create a button with the correct initial text", () => {
        expect(themeSwitch.element).toBeInstanceOf(HTMLButtonElement);
        expect(themeSwitch.element.innerText).toBe("Horizontal");
    });

    it("should toggle theme and update button text on click", () => {
        themeSwitch.onclick();

        expect(settingStateMgr.setThemeValue).toHaveBeenCalledWith(ThemeTypeEnum.VERTICAL);
        expect(themeSwitch.element.innerText).toBe("Vertical");

        themeSwitch.onclick();

        expect(settingStateMgr.setThemeValue).toHaveBeenCalledWith(ThemeTypeEnum.HORIZONTAL);
        expect(themeSwitch.element.innerText).toBe("Horizontal");
    });

    it("should call onSettingChange callback when clicked", () => {
        themeSwitch.onclick();
        expect(mockOnSettingChange).toHaveBeenCalled();
    });
});