import { renderImage } from '../../components/common/image';
import { ItemType, LevelEnum, ThemeTypeEnum } from '../../types';

describe('renderImage', () => {
	let parentElement: HTMLDivElement;
	let item: ItemType;

	beforeEach(() => {
		parentElement = document.createElement('div'); // Mock a parent element

		item = {
			id: 'test-item',
			visuals: {
				artwork: {
					horizontal_tile: { image: { path: 'https://test.com/horizontal_image' }, text: 'Test' },
					vertical_tile: { image: { path: 'https://test.com/vertical_image' }, text: 'Test' },
				},
				primary_branding: {
					artwork: {
						"brand.watermark": { path: 'https://test.com/default-logo' },
						"brand.watermark.bottom.right": { path: 'https://test.com/watermark' }
					}
				}
			}
		} as unknown as ItemType; // Mock an item with images
  	});

	it('should set the correct background image on success', () => {

		// Mock Image to auto-call onload
		jest.spyOn(global, 'Image').mockImplementation(() => {
	
			const img = {} as HTMLImageElement;

			setTimeout(() => {
				img.onload && img.onload(new Event('load'));
			}, 0);
			return img;
		});

		renderImage(item, parentElement, LevelEnum.S, ThemeTypeEnum.HORIZONTAL);

		setTimeout(() => {
			expect(parentElement.style.backgroundImage).toBe(`url(https://test.com/horizontal_imag&size=200x120&format=jpeg)`);
		}, 0);
	});

	it('should load fallback image when the primary image fails', () => {

		// Mock Image to auto-call onload
		jest.spyOn(global, 'Image').mockImplementation(() => {
	
			const img = {} as HTMLImageElement;

			setTimeout(() => {
				img.onerror && img.onerror(new Event('error'));
			}, 0); // Fail first
			setTimeout(() => {
				img.onload && img.onload(new Event('load'));
			}, 10); // Succeed on fallback

			return img;
		});

		renderImage(item, parentElement, LevelEnum.M, ThemeTypeEnum.HORIZONTAL);

		setTimeout(() => {
			expect(parentElement.style.backgroundImage).toBe(`url(https://test.com/horizontal_imag&size=200x120&format=jpeg)`);
		}, 20);
	});

	it('should use default branding image when all images fail', () => {

		// Mock Image to auto-call onload
		jest.spyOn(global, 'Image').mockImplementation(() => {
	
			const img = {} as HTMLImageElement;

			setTimeout(() => {
				img.onerror && img.onerror(new Event('error'));
			}, 0);

			return img;
		});

		renderImage(item, parentElement, LevelEnum.M, ThemeTypeEnum.HORIZONTAL);

		setTimeout(() => {
			expect(parentElement.style.backgroundImage).toBe(`url(https://test.com/default-logo&size=200x120&format=jpeg)`);
		}, 20);
	});

	it('should add watermark if available', () => {
		renderImage(item, parentElement, LevelEnum.S, ThemeTypeEnum.HORIZONTAL);

		setTimeout(() => {
			const watermarkElement = parentElement.querySelector('.watermark') as HTMLDivElement;

			expect(watermarkElement.style.backgroundImage).toBe(
				`url(https://test.com/watermark&size=60x40&format=png)`
			);
		}, 10);
	});

	afterEach(() => {
		jest.restoreAllMocks(); // Restore Image mock
	});
});