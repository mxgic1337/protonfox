import {createElement, getProtonDBRating, upperCase} from "./utils/utils";

/**
 * Adds rating text to the hover box
 */
export function checkHover() {
	const hoverDiv = document.getElementById('global_hover_content');
	const mutationObserver = new window.MutationObserver(() => {
		if (!hoverDiv) return
		const games = hoverDiv.children;
		for (const game of games) {
			if (!game.id.startsWith('hover_app_')) continue;
			const reviews = game.getElementsByClassName('hover_review_summary')[0]
			const hasRating = reviews.getElementsByClassName('protonfox-rating-bright').length !== 0;
			if (!hasRating) {
				const gameId = game.id.substring('hover_app_'.length);
				getProtonDBRating(gameId).then(async (rating) => {
					const protonDBRatingTitle = createElement('ProtonDB rating: ', ['title'], 'div');
          protonDBRatingTitle.appendChild(createElement(upperCase(rating), [`protonfox-rating-${rating}`, 'protonfox-rating-bright']))
					reviews.prepend(protonDBRatingTitle)
				})
			}
		}
	});
	if (hoverDiv) {
		mutationObserver.observe(hoverDiv, {childList: true});
	}
}