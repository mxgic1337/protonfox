import {createSpan, getGameID, getProtonDBRating, ProtonDBSummary, upperCase} from "./utils/utils";

export function checkSearch() {
	const searchResults = document.getElementById('search_suggestion_contents');
	const mutationObserver = new window.MutationObserver(()=>{
		const games = document.getElementsByClassName('match_app')
		for (const game of games) {
			const name = game.getElementsByClassName('match_name')[0]
			const gameId = getGameID(game.getAttribute('href') || "10");
			getProtonDBRating(gameId).then(async (rating) => {
				name.appendChild(createSpan(upperCase(rating), ['tag', rating]))
			})
		}
	});
	if (searchResults) {
		mutationObserver.observe(searchResults, {childList: true});
	}
}