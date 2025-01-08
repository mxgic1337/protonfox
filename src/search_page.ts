import {createSpan, getGameID, getProtonDBRating, ProtonDBSummary, upperCase} from "./utils/utils";

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
		getProtonDBRating(gameId).then(async (rating) => {
			if (game.getElementsByClassName('tag').length > 0) { return; }
			name.appendChild(createSpan(upperCase(rating), ['tag', rating, 'search']))
		})
	}
}