import {checkGamePage} from "./game_page";
import {checkNavSearch} from "./store_search";
import {checkSearchPage} from "./search_page";
import {ProtonDBRating} from "./utils/utils";
import {checkHover} from "./hover";

export const ratings: {[key: string]: ProtonDBRating} = {}

if (window.location.href.startsWith('https://store.steampowered.com/app')) {
	checkGamePage()
}
if (window.location.href.startsWith('https://store.steampowered.com/search')) {
	checkSearchPage()
}

/* Check if the global hover div appeared */
const mutationObserver = new window.MutationObserver(()=> {
	if (document.getElementById('global_hover')) {
		checkHover()
		mutationObserver.disconnect();
	}
});
mutationObserver.observe(document.getElementsByTagName("body")[0], {childList: true, subtree: false});

checkNavSearch()