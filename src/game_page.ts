import {createElement, getGameID, getProtonDBRating, ProtonDBRating, ProtonDBSummary, upperCase} from "./utils/utils";
import {addStoreRatingBadge, addSystemRequirementsRating} from "./utils/store";
import './styles/steam.less'

/**
 * Adds rating tags to the game page
 */
export function checkGamePage() {
	const gameId = getGameID();

	getProtonDBRating(gameId).then(async (rating) => {
		addStoreRatingBadge(gameId, rating);
		addSystemRequirementsRating(gameId, rating);

		let native = false;
		for (const tab of document.getElementsByClassName('sysreq_tab')) {
			if (tab.getAttribute('data-os') === 'linux') native = true
		}
		if (native) addStoreRatingBadge(gameId, ProtonDBRating.NATIVE)
	})
}