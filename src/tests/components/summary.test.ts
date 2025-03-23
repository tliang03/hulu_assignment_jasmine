import { generateSummary } from "../../components/common/summary";
import { ItemType } from "../../types";

describe("generateSummary", () => {
    let mockItem: ItemType;

    beforeEach(() => {
        mockItem = {
            entity_metadata: {
                rating: { code: "PG-13" },
                premiere_date: "2020-05-15T00:00:00Z",
                genre_names: ["Action", "Thriller"]
            }
        } as unknown as ItemType;
    });

    test("should create a summary element with the correct classes", () => {
        const summaryEl = generateSummary(mockItem);
        expect(summaryEl).toBeInstanceOf(HTMLElement);
        expect(summaryEl.classList.contains("summary-wrapper")).toBe(true);
    });

    test("should correctly render rating, year, and genres with dividers", () => {
        const summaryEl = generateSummary(mockItem);
        expect(summaryEl.innerHTML).toContain("<div>PG-13</div>");
        expect(summaryEl.innerHTML).toContain("<div>2020</div>");
        expect(summaryEl.innerHTML).toContain("<div class=\"names\">Action, Thriller</div>");
    });

    test("should not add dividers if only one section exists", () => {
        delete mockItem.entity_metadata.genre_names;
        delete mockItem.entity_metadata.premiere_date;
        const summaryEl = generateSummary(mockItem);
        expect(summaryEl.innerHTML).toBe("<div>PG-13</div>");
    });

    test("should handle missing metadata gracefully", () => {
        const emptyItem = { entity_metadata: {} } as ItemType;
        const summaryEl = generateSummary(emptyItem);
        expect(summaryEl.innerHTML).toBe("");
    });
});