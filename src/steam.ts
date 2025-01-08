import {ProtonDBRating, ProtonDBSummary} from "./utils/utils";
import {addStoreRatingBadge, addSystemRequirementsRating} from "./utils/store";
import './styles/steam.less'

function getGameID() {
	return window.location.href.substring("https://store.steampowered.com/app/".length).split('/')[0]
}

const gameId = getGameID();
fetch(`https://www.protondb.com/api/v1/reports/summaries/${gameId}.json`).then(async (res) => {
	if (res.ok) {
		const json = await res.json() as ProtonDBSummary;
		addStoreRatingBadge(gameId, json.tier)
		addSystemRequirementsRating(gameId, json.tier)
	}else{
		addStoreRatingBadge(gameId, ProtonDBRating.PENDING)
		addSystemRequirementsRating(gameId, ProtonDBRating.PENDING)
	}

	let native = false;
	for (const tab of document.getElementsByClassName('sysreq_tab')) {
		if (tab.getAttribute('data-os') === 'linux') native = true
	}
	if (native) addStoreRatingBadge(gameId, ProtonDBRating.NATIVE)
})