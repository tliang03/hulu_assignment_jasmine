
//Main fetch function with error handler
export const fetchResp = async (url: string) => {
	try {
		const resp = await fetch(url);

		if(!resp.ok) {
			throw new Error('Response is not ok');
		}

		const data = await resp.json();

		return data;

	} catch (e) {

		let errMsg = '';

		if (typeof e === "string") {
			errMsg = e.toUpperCase() // works, `e` narrowed to string
		} else if (e instanceof Error) {
			errMsg = e.message;
			
		}

		console.log(`Fetch Error: ${ errMsg } - ${url}`);

		return null;
		
	}
}