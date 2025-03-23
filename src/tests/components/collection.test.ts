import { fetchCollectionById } from "../../actions/fetchCollectionById";
import { generateCollection } from "../../components/collections/collection";
import { CollectionType, ItemType, ThemeTypeEnum, TypeEnum } from "../../types";

jest.mock("../../actions/fetchCollectionById", () => ({
	fetchCollectionById: jest.fn(),
}));

jest.mock("../../components/collections/tile", () => ({
	generateTile: jest.fn(() => document.createElement("div")),
}));

describe("generateCollection", () => {
	let collection: CollectionType;
	let updateCollectionMock: jest.Mock;

	beforeEach(() => {
		updateCollectionMock = jest.fn();

		collection = {
			_type: TypeEnum.COLLECTION,
			id: "test-collection",
			name: "Test Collection",
			items: [
				{
					id: "item-1",
					visuals: { artwork: {} },
				} as ItemType,
			],
		} as unknown as CollectionType;

		// Mocking IntersectionObserver in Jest
		global.IntersectionObserver = jest.fn().mockImplementation((callback) => {
			return {
				observe: jest.fn(),
				unobserve: jest.fn(),
				disconnect: jest.fn(),
				takeRecords: jest.fn(),
				// Manually trigger the callback to simulate the intersection event
				trigger: (isIntersecting: boolean) => callback([{ isIntersecting }]),
			};
		});
	});

	it("should render collection with tiles when items exist", () => {
		const collElement = generateCollection(collection, 0, updateCollectionMock);

		expect(collElement.classList.contains("collection-container")).toBe(true);
		expect(collElement.querySelector(".title")?.innerHTML).toBe("Test Collection");
	});

	it("should show empty message when no items are available", () => {
		collection.items = [];
		const collElement = generateCollection(collection, 0, updateCollectionMock);

		expect(collElement.querySelector(".empty-msg")?.innerHTML).toBe("No Content Available");
	});

	it("should fetch collection when in view", async () => {
		collection.items = [];
		
		const mockData = {
			_type: TypeEnum.COLLECTION,
			id: "test-collection",
			name: "Updated Collection",
			items: [{ id: "item-2", visuals: { artwork: {} } } as ItemType],
		};

		(fetchCollectionById as jest.Mock).mockImplementation(async (_id, { onSuccess }) => {
			onSuccess?.(mockData);
		});

		const collElement = generateCollection(collection, 0, updateCollectionMock);

		// Simulate intersection observer triggering fetch
		const observerCallback = (global.IntersectionObserver as jest.Mock).mock.calls[0][0];
		observerCallback([{ isIntersecting: true }]);

		// Wait for async execution
		await new Promise((resolve) => setTimeout(resolve, 0));

		expect(fetchCollectionById).toHaveBeenCalledTimes(1);

	});

});