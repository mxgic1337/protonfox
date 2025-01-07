import {createSpan, ProtonDBRating, upperCase} from "./utils";

export function addStoreRatingBadge(gameId: string, rating: ProtonDBRating) {
	const appInfo = document.getElementsByClassName('apphub_OtherSiteInfo')[0]
	const element = document.createElement("a");
	element.appendChild(rating === ProtonDBRating.NATIVE ? createSpan("Native") : createSpan("ProtonDB: " + upperCase(rating)));

	element.classList.add('badge')
	element.classList.add(rating)
	element.classList.add('btn_medium')

	element.href = `https://protondb.com/app/${gameId}`
	element.target = '_blank'
	appInfo.insertBefore(element, appInfo.firstChild);
}

export function addSystemRequirementsRating(gameId: string, rating: ProtonDBRating) {
	const appInfo = document.getElementsByClassName('sysreq_contents')[0]
	const element = document.createElement("a");
	element.appendChild(document.createTextNode("ProtonDB rating: " + upperCase(rating)));

	element.href = `https://protondb.com/app/${gameId}`
	element.target = '_blank'

	element.classList.add(rating)
	element.style.fontSize = '12px'
	element.style.marginBottom = '6px'
	element.style.fontWeight = 'bold'

	appInfo.insertBefore(element, appInfo.firstChild);
}