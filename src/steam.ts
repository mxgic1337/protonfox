import {checkGamePage} from "./game_page";
import {checkSearch} from "./store_search";
import {checkSearchPage} from "./search_page";

if (window.location.href.startsWith('https://store.steampowered.com/app')) {
	checkGamePage()
}
if (window.location.href.startsWith('https://store.steampowered.com/search')) {
	checkSearchPage()
}

checkSearch()