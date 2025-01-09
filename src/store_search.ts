import {createElement, getGameID, getProtonDBRating, ProtonDBSummary, upperCase} from "./utils/utils";

/**
 * Adds rating tags to the search results in the navbar
 */
export function checkNavSearch() {
	const searchResults = document.getElementById('search_suggestion_contents');
	const mutationObserver = new window.MutationObserver(()=>{
		const games = document.getElementsByClassName('match_app')
		for (const game of games) {
			const name = game.getElementsByClassName('match_name')[0]
			const gameId = getGameID(game.getAttribute('href') || "10");
			getProtonDBRating(gameId).then(async (rating) => {
				name.appendChild(createElement(upperCase(rating), ['protonfox-tag', `protonfox-rating-${rating}`]))
			})
		}
	});
	if (searchResults) {
		mutationObserver.observe(searchResults, {childList: true});
	}
}