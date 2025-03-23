
import { generateMainContainer } from "../../components/container";
import { generateCollectionList } from "../../components/collections/list";

jest.mock("../../components/collections/list", () => ({
    generateCollectionList: jest.fn(() => [])
}));

jest.mock("../../components/settings/setting", () => ({
    generateSetting: jest.fn(() => document.createElement("div")),
    focusOnSetting: jest.fn(),
    isSettingAreaFocused: jest.fn(() => false),
    removeSettingFocus: jest.fn()
}));

jest.mock("../../components/modal", () => ({
    generateModal: jest.fn(() => [document.createElement("div")]),
    isModalOpen: jest.fn(() => false),
    resetModal: jest.fn()
}));

describe("generateMainContainer", () => {
    let hubData: any;
    let containerDiv: HTMLElement;

    beforeEach(() => {
        hubData = {
            components: [
                { items: [{ id: 1 }, { id: 2 }] },
                { items: [{ id: 3 }] }
            ]
        };

        containerDiv = generateMainContainer(hubData);
        document.body.appendChild(containerDiv);
    });

    afterEach(() => {
        document.body.innerHTML = "";
        jest.clearAllMocks();
    });

    it("should create the main container", () => {
        expect(containerDiv).toBeInstanceOf(HTMLDivElement);
        expect(containerDiv.classList.contains("main-wrapper")).toBeTruthy();
    });

    it("should render the collection list", () => {
        expect(generateCollectionList).toHaveBeenCalledWith(hubData, expect.any(Function));
    });

});