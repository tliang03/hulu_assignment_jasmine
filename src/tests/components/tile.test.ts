import { settingStateMgr } from '../../components/settings/setting';
import { renderImage } from '../../components/common/image';
import { generateSummary } from '../../components/common/summary';
import { generateTile } from '../../components/collections/tile';
import { ItemType, ThemeTypeEnum } from '../../types';

// Mock dependencies
jest.mock('../../components/common/image', () => ({
	renderImage: jest.fn(),
}));

jest.mock('../../components/common/summary', () => ({
	generateSummary: jest.fn(),
}));

jest.mock("../../components/settings/setting", () => ({
    settingStateMgr: {
        getThemveValue: jest.fn(),
        setThemeValue: jest.fn()
    }
}));

describe('generateTile', () => {
	
	const mockItem: ItemType = {
		"_type": "view",
		"id": "5a310c23-e2db-4c9f-a66c-27c2fee43d92",
		"view_template": "cover_story_standard",
		"visuals": {
			"artwork": {
				"_type": "artwork_orientation",
				"horizontal_tile": {
					"_type": "artwork",
					"artwork_type": "display_image",
					"image": {
					"path": "https://img.hulu.com/user/v3/artwork/5a310c23-e2db-4c9f-a66c-27c2fee43d92?base_image_bucket_name=image_manager&base_image=da72f38a-f162-4db1-adba-22438cf564d6",
					"accent": {
						"hue": 195,
						"classification": "medium"
					},
					"image_id": "image_manager|da72f38a-f162-4db1-adba-22438cf564d6"
					},
					"text": "Reservation Dogs"
				},
				"vertical_tile": {
					"_type": "artwork",
					"artwork_type": "display_image",
					"image": {
					"path": "https://img.hulu.com/user/v3/artwork/5a310c23-e2db-4c9f-a66c-27c2fee43d92?base_image_bucket_name=image_manager&base_image=7c5c4720-6cda-4824-baba-39cea11abbee",
					"accent": {
						"hue": 130,
						"classification": "medium"
					},
					"image_id": "image_manager|7c5c4720-6cda-4824-baba-39cea11abbee"
					},
					"text": "Reservation Dogs"
				}
			},
			"headline": "Reservation Dogs",
			"action_text": "Watch Next Episode",
			"subtitle": "S1 E2 - NDN Clinic",
			"body": "A half-hour comedy that follows four Indigenous teenagers in rural Oklahoma as they steal, rob and save to get to the exotic, mysterious and faraway land of California.",
			"footer": "",
			"prompt": "Watch Next Episode",
			"primary_branding": {
				"id": "f812637b-6186-48e4-9b63-85167ba2cf17",
				"name": "Hulu Original Series",
				"artwork": {
					"brand.watermark": {
						"path": "https://img4.hulu.com/user/v3/artwork/f812637b-6186-48e4-9b63-85167ba2cf17?base_image_bucket_name=image_manager&base_image=ebbb53e2-7bb0-4f86-ac76-8fe74e2df0d1",
						"accent": {
							"hue": 0,
							"classification": "light"
						},
						"image_type": "brand.watermark",
						"image_id": "image_manager|ebbb53e2-7bb0-4f86-ac76-8fe74e2df0d1"
					},
					"brand.logo": {
						"path": "https://img4.hulu.com/user/v3/artwork/f812637b-6186-48e4-9b63-85167ba2cf17?base_image_bucket_name=image_manager&base_image=f1187811-6d06-45f1-9666-090170324790",
						"accent": {
							"hue": 155,
							"classification": "light"
						},
						"image_type": "brand.logo",
						"image_id": "image_manager|f1187811-6d06-45f1-9666-090170324790"
					},
					"brand.watermark.bottom.right": {
						"path": "https://img4.hulu.com/user/v3/artwork/f812637b-6186-48e4-9b63-85167ba2cf17?base_image_bucket_name=image_manager&base_image=869e68d8-de1f-4c66-ac40-521d403076eb",
						"accent": {
							"hue": 155,
							"classification": "light"
						},
						"image_type": "brand.watermark.bottom.right",
						"image_id": "image_manager|869e68d8-de1f-4c66-ac40-521d403076eb"
					}
				}
			}
		},
		"entity_metadata": {
			"genre_names": [
				"Comedy",
				"Drama",
				"Crime"
			],
			"premiere_date": "2021-08-09T00:00:00Z",
			"rating": {
				"code": "TVMA"
			},
			"series_description": "A half-hour comedy that follows four Indigenous teenagers in rural Oklahoma as they steal, rob and save to get to the exotic, mysterious and faraway land of California.",
			"entity_type": "episode",
			"episode_text": "S1 E2 - NDN Clinic",
			"is_warm": false
		}
	};

	// Mocking external functions
	(renderImage as jest.Mock).mockImplementation(() => {});  // Mocking renderImage
	(generateSummary as jest.Mock).mockImplementation(() => document.createElement('div')); // Mocking generateSummary


	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should generate a tile element with correct classes and attributes for horizontal theme', () => {
		
		const idx = 1;

		(settingStateMgr.getThemveValue as jest.Mock).mockReturnValue(ThemeTypeEnum.HORIZONTAL);
		const tileElement = generateTile(mockItem, idx);

		// Check if the tileElement has the correct class and attributes
		expect(tileElement.classList.contains('tile')).toBe(true);
		expect(tileElement.classList.contains(ThemeTypeEnum.HORIZONTAL)).toBe(true);
		expect(tileElement.getAttribute('data-tile')).toBe(idx.toString());

		// Check if the detail element has the correct title
		const detailElement = tileElement.querySelector('.detail');
		const titleElement = detailElement?.querySelector('.detail-title');
		expect(titleElement?.innerHTML).toBe(mockItem.visuals.artwork.horizontal_tile.text);

	});

	it('should generate a tile element with correct classes and attributes for vertical theme', () => {
		const idx = 2;

		(settingStateMgr.getThemveValue as jest.Mock).mockReturnValue(ThemeTypeEnum.VERTICAL);
		const tileElement = generateTile(mockItem, idx);

		// Check if the tileElement has the correct class and attributes
		expect(tileElement.classList.contains('tile')).toBe(true);
		expect(tileElement.classList.contains(ThemeTypeEnum.VERTICAL)).toBe(true);
		expect(tileElement.getAttribute('data-tile')).toBe(idx.toString());


		// Check if the detail element has the correct title
		const detailElement = tileElement.querySelector('.detail');
		const titleElement = detailElement?.querySelector('.detail-title');
		expect(titleElement?.innerHTML).toBe(mockItem.visuals.artwork.vertical_tile.text);
	});

});