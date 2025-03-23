let themeValue = ThemeTypeEnum.HORIZONTAL;import { fetchHub } from './actions/fetchHub';
import { generateMainContainer } from './components/container';
import { HubRespType, ThemeTypeEnum } from './types';

import './styles.css';

const mainElement = document.createElement('div');

mainElement.id = 'main-container';

//Function to render error message
const renderErrMsg = () => {
	const errEl = document.createElement('div');
	errEl.classList.add('error-message');
	errEl.innerHTML = 'Something went wrong while loading the content.';

	mainElement.appendChild(errEl);
}

//Function to render list
const renderList = (hubData: HubRespType) => {
	
	if(hubData) {
		const containerDiv = generateMainContainer(hubData);

		mainElement.appendChild(containerDiv);
	} else {
		renderErrMsg();
	}
}

//Fetch hub data when data not exist yet
fetchHub({	
	onSuccess: (resp: HubRespType) => {

		renderList(resp);
	},
	onError: () => {

		//render error message to user when hub fetch failed
		renderErrMsg();
	}
});
document.body.appendChild(mainElement);