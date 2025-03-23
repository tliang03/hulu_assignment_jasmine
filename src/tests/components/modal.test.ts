import { generateModal, isModalOpen, resetModal } from "../../components/modal";
import { ItemType } from "../../types";

jest.mock("../../components/common/image", () => ({
    renderImage: jest.fn()
}));

jest.mock("../../components/common/summary", () => ({
    generateSummary: jest.fn(() => {
        const summaryDiv = document.createElement("div");
        summaryDiv.classList.add("summary");
        summaryDiv.textContent = "Mock Summary";

        return summaryDiv;
    })
}));

describe("generateModal", () => {
    let mockItem: ItemType;

    beforeEach(() => {
        document.body.innerHTML = ""; // Clear DOM before each test
		
        mockItem = {
            visuals: {
                headline: "Test Headline",
                body: "Test Description"
            }
        } as unknown as ItemType;
    });

    test("should create and return modal and overlay elements", () => {
        const [modalOverlayEl, modalEl] = generateModal(mockItem);
        
        expect(modalEl).toBeInstanceOf(HTMLElement);
        expect(modalEl.classList.contains("modal")).toBe(true);
        expect(modalOverlayEl).toBeInstanceOf(HTMLElement);
        expect(modalOverlayEl.classList.contains("modal-overlay")).toBe(true);
    });


    test("should correctly render title and description", () => {
        document.body.append(...generateModal(mockItem));

        expect(document.querySelector(".headline")?.textContent).toBe("Test Headline");
        expect(document.querySelector(".info")?.textContent).toBe("Test Description");
    });


    test("isModalOpen should return true when modal is open", () => {
        document.body.append(...generateModal(mockItem));

        expect(isModalOpen()).toBe(true);
    });

    test("resetModal should remove modal elements", () => {
        document.body.append(...generateModal(mockItem));
        resetModal();
		
        expect(document.querySelector(".modal")).toBeNull();
        expect(document.querySelector(".modal-overlay")).toBeNull();
    });
});