import { ItemType } from "../../types";

//Function to add divider div between each info
const addDivider = (summary: string) => {
	
	if(summary) {
		summary += '<div class="divider"></div>';
	}

	return summary;
}

//Function to generate summary
export const generateSummary = (item: ItemType) => {

	const summaryEl = document.createElement('div');
	summaryEl.classList.add('summary-wrapper');

	let summary = '';

	//Rating code
	if(item.entity_metadata?.rating?.code) {

		summary += `<div>${item.entity_metadata?.rating?.code}</div>`;
	}

	//Year
	if(item.entity_metadata?.premiere_date) {

		summary = addDivider(summary);
		
		summary += '<div>' + new Date(item.entity_metadata.premiere_date).getFullYear() + '</div>';
	}

	//Names
	if(item.entity_metadata?.genre_names?.length) {

		summary = addDivider(summary);

		summary += '<div class="names">' + item.entity_metadata.genre_names.join(', ') + '</div>';
	}

	summaryEl.innerHTML = summary;

	return 	summaryEl;

}