import {createSpan, getGameID, ProtonDBSummary, upperCase} from "./utils/utils";

export function checkSearchPage() {
	const searchResults = document.getElementById('search_resultsRows');
	const mutationObserver = new window.MutationObserver(async ()=>{
		checkSearchResults()
	});
	if (searchResults) {
		checkSearchResults()
		mutationObserver.observe(searchResults, {childList: true});
	}
}

function checkSearchResults() {
	const games = document.getElementsByClassName('search_result_row')
	for (const game of games) {
		if (game.getElementsByClassName('tag').length > 0) { continue; }
		const name = game.getElementsByClassName('title')[0]
		const gameId = getGameID(game.getAttribute('href') || "10");
		fetch(`https://www.protondb.com/api/v1/reports/summaries/${gameId}.json`).then(async (res) => {
			if (game.getElementsByClassName('tag').length > 0) { return; }
			if (res.ok) {
				const json = await res.json() as ProtonDBSummary;
				name.appendChild(createSpan(upperCase(json.tier), ['tag', json.tier, 'search']))
			} else {
				name.appendChild(createSpan('Unknown', ['tag', 'unknown', 'search']))
			}
		})
	}
}