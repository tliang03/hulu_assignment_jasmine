import { settingStateMgr } from "../../components/settings/setting";
import { generateCollection } from "../../components/collections/collection";
import { generateCollectionList } from "../../components/collections/list";
import { generateModal } from "../../components/modal";
import { CollectionType, HubRespType, ThemeTypeEnum } from "../../types";

jest.mock("../../components/collections/collection", () => ({ 
	generateCollection: jest.fn() 
}));

jest.mock("../../components/modal", () => ({
	generateModal: jest.fn(() => [document.createElement("div")]),
	isModalOpen: jest.fn(() => false),
	resetModal: jest.fn()
}));

jest.mock("../../components/settings/setting", () => ({
    settingStateMgr: {
        getThemveValue: jest.fn(),
        setThemeValue: jest.fn()
    }
}));

// Mocking generateCollection
(generateCollection as jest.Mock).mockImplementation((collection: any, rowIdx: any) => {
	const el = document.createElement('div');
	el.setAttribute('data-row', rowIdx.toString());

	const tile = document.createElement('div');
	tile.setAttribute('data-tile', '0');

	el.appendChild(tile);

	return el;
});

window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe("generateCollectionList", () => {
	let updateCollectionMock: jest.Mock;	
	let hubData: HubRespType;

	beforeEach(() => {
		document.body.innerHTML = "<div id='main-container'></div>";

		updateCollectionMock = jest.fn();
		
		hubData = {
			components: [
				{ id: "1", name: "Collection 1", items: [{ id: "item-1" }] }  as unknown as CollectionType,
				{ id: "2", name: "Collection 2", items: [{ id: "item-2" }] } as unknown as CollectionType
			]
		} as unknown as HubRespType;

		(settingStateMgr.getThemveValue as jest.Mock).mockReturnValue(ThemeTypeEnum.HORIZONTAL);
		
	});

	it("should generate collection elements", () => {
		const elements = generateCollectionList(hubData, updateCollectionMock);

		expect(elements.length).toBe(hubData.components.length);
		expect(generateCollection).toHaveBeenCalledTimes(hubData.components.length);
	});
});
