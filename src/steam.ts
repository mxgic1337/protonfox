import { checkGamePage } from './game_page';
import { checkNavSearch } from './store_search';
import { checkSearchPage } from './search_page';
import { AreWeAntiCheatYetStatus, log, ProtonDBRating } from './utils/utils';
import { checkHover } from './hover';

import './assets/icons/ac-supported.svg';
import './assets/icons/ac-running.svg';
import './assets/icons/ac-planned.svg';
import './assets/icons/ac-broken.svg';
import './assets/icons/ac-denied.svg';

export const ratings: { [key: string]: ProtonDBRating } = {};
export type AntiCheatCompatibility = {
	status: AreWeAntiCheatYetStatus;
	slug: string;
	storeIds: { steam?: string };
};

export let antiCheatCompatibility: AntiCheatCompatibility[] = [];

function startCheck() {
	log(`Initialized extension.`);
	if (window.location.href.startsWith('https://store.steampowered.com/app')) {
		checkGamePage();
	}
	if (
		window.location.href.startsWith('https://store.steampowered.com/search')
	) {
		checkSearchPage();
	}

	/* Check if the global hover div appeared */
	const mutationObserver = new window.MutationObserver(() => {
		if (document.getElementById('global_hover')) {
			checkHover();
			mutationObserver.disconnect();
		}
	});
	mutationObserver.observe(document.getElementsByTagName('body')[0], {
		childList: true,
		subtree: false,
	});

	checkNavSearch();
}

fetch(
	'https://api.github.com/repos/AreWeAntiCheatYet/AreWeAntiCheatYet/contents/games.json'
)
	.then(async (res) => {
		if (res.ok) {
			const ghResponse = (await res.json()) as { content: string };
			antiCheatCompatibility = JSON.parse(
				atob(ghResponse.content)
			) as AntiCheatCompatibility[];
		}
		startCheck();
	})
	.catch((err) => {
		log(`Failed to fetch AreWeAntiCheatYet data: ${err}`);
		startCheck();
	});
