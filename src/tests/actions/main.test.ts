import { fetchResp } from "../../actions/main";

const DummyURL = 'http://test.com';

global.fetch = jest.fn();

describe('fetchResp', () => {

	beforeEach(() => {
		// Reset mock before each test
		jest.clearAllMocks();
	});
  
	it('should return data when fetch is successful', async () => {

		const mockData = { message: 'Success' };
		const mockResponse = {
			ok: true,
			json: jest.fn().mockResolvedValue(mockData),
		};
		
		(fetch as jest.Mock).mockResolvedValue(mockResponse);

		const result = await fetchResp(DummyURL);
		expect(result).toEqual(mockData);
		expect(fetch).toHaveBeenCalledWith(DummyURL);
	});
  
	it('should throw error when fetch returns a non-OK response', async () => {

		const mockResponse = {
			ok: false,
			status: 404,
			json: jest.fn(),
		};

		(fetch as jest.Mock).mockResolvedValue(mockResponse);

		const result = await fetchResp(DummyURL);
		expect(result).toBeNull(); // it should return null
	});
  
	it('should return null if a network or other error occurs', async () => {
		const errorMessage = 'Network Error';
		(fetch as jest.Mock).mockRejectedValue(new Error(errorMessage));

		const result = await fetchResp(DummyURL);
		expect(result).toBeNull(); // it should return null
		expect(fetch).toHaveBeenCalledWith(DummyURL);
	});

  });
  