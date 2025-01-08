import {createSpan, getGameID, ProtonDBSummary, upperCase} from "./utils/utils";

export function checkSearch() {
	const searchResults = document.getElementById('search_suggestion_contents');
	const mutationObserver = new window.MutationObserver(()=>{
		const games = document.getElementsByClassName('match_app')
		for (const game of games) {
			const name = game.getElementsByClassName('match_name')[0]
			const gameId = getGameID(game.getAttribute('href') || "10");
			fetch(`https://www.protondb.com/api/v1/reports/summaries/${gameId}.json`).then(async (res) => {
				if (res.ok) {
					const json = await res.json() as ProtonDBSummary;
					name.appendChild(createSpan(upperCase(json.tier), ['tag', json.tier]))
				} else {
					name.appendChild(createSpan('Pending', ['tag', 'pending']))
				}
			})
		}
	});
	if (searchResults) {
		mutationObserver.observe(searchResults, {childList: true});
	}
}