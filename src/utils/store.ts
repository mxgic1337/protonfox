import {
	AreWeAntiCheatYetStatus,
	createElement,
	log,
	ProtonDBRating,
	upperCase,
} from './utils';

export function addStoreRatingBadge(gameId: string, rating: ProtonDBRating) {
	const appInfo = document.getElementsByClassName('apphub_OtherSiteInfo')[0];
	const element = document.createElement('a');
	element.appendChild(
		rating === ProtonDBRating.NATIVE
			? createElement('Native')
			: createElement('ProtonDB: ' + upperCase(rating))
	);

	element.classList.add('protonfox-badge');
	element.classList.add(`protonfox-rating-${rating}`);
	element.classList.add('btn_medium');

	element.href = `https://protondb.com/app/${gameId}`;
	element.target = '_blank';
	appInfo.insertBefore(element, appInfo.firstChild);
}

export function addAntiCheatStatusBadge(
	gameId: string,
	status: AreWeAntiCheatYetStatus
) {
	const appInfo = document.getElementsByClassName('apphub_OtherSiteInfo')[0];
	const element = document.createElement('a');
	const iconElement = createElement(
		'',
		[`protonfox-icon`],
		'span',
		`mask-image: url(${browser.runtime.getURL(`assets/ac-${status.toLowerCase()}.svg`)});`
	);
	element.appendChild(iconElement);

	element.classList.add('protonfox-badge');
	element.classList.add(`protonfox-ac-rating-${status.toLowerCase()}`);
	element.classList.add('btn_medium');

	element.title = `AntiCheat status: ${status} (Are We Anti-Cheat Yet?)`;
	element.href = `https://areweanticheatyet.com/game/${gameId}`;
	element.target = '_blank';
	appInfo.insertBefore(element, appInfo.firstChild);
}

export function addSystemRequirementsRating(
	gameId: string,
	rating: ProtonDBRating
) {
	const appInfo = document.getElementsByClassName('sysreq_contents')[0];
	const element = document.createElement('a');
	element.appendChild(
		document.createTextNode('ProtonDB rating: ' + upperCase(rating))
	);

	element.href = `https://protondb.com/app/${gameId}`;
	element.target = '_blank';

	element.classList.add(`protonfox-rating-${rating}`);
	element.style.fontSize = '12px';
	element.style.marginBottom = '6px';
	element.style.fontWeight = 'bold';

	appInfo.insertBefore(element, appInfo.firstChild);
}
