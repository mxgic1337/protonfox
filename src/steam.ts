import {checkGamePage} from "./game_page";
import {checkSearch} from "./store_search";
import {checkSearchPage} from "./search_page";
import {ProtonDBRating} from "./utils/utils";

export const ratings: {[key: string]: ProtonDBRating} = {}

if (window.location.href.startsWith('https://store.steampowered.com/app')) {
	checkGamePage()
}
if (window.location.href.startsWith('https://store.steampowered.com/search')) {
	checkSearchPage()
}

checkSearch()