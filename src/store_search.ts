import {
	createElement,
	getAreWeAntiCheatYetRating,
	getGameID,
	getProtonDBRating,
	ProtonDBSummary,
	upperCase,
} from './utils/utils';

/**
 * Adds rating tags to the search results in the navbar
 */
export function checkNavSearch() {
	const searchResults = document.getElementById('search_suggestion_contents');
	const mutationObserver = new window.MutationObserver(() => {
		const games = document.getElementsByClassName('match_app');
		for (const game of games) {
			const name = game.getElementsByClassName('match_name')[0];
			const gameId = getGameID(game.getAttribute('href') || '10');
			getProtonDBRating(gameId).then(async (rating) => {
				name.appendChild(
					createElement(upperCase(rating), [
						'protonfox-tag',
						`protonfox-rating-${rating}`,
					])
				);
				const status = getAreWeAntiCheatYetRating(gameId);
				if (status) {
					const statusElement = createElement(
						' ',
						['protonfox-icon', `protonfox-ac-rating-${status.toLowerCase()}`],
						'span',
						`mask-image: url(${browser.runtime.getURL(`assets/ac-${status.toLowerCase()}.svg`)});`
					);
					statusElement.title = `AntiCheat status: ${status} (Are We Anti-Cheat Yet?)`;
					name.appendChild(statusElement);
				}
			});
		}
	});
	if (searchResults) {
		mutationObserver.observe(searchResults, { childList: true });
	}
}
