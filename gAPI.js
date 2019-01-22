import {Rectangle} from "./Rectangle.js";

// Client ID and API key from the Developer Console
var CLIENT_ID = config.CLIENT_ID;

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/spreadsheets";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');
/**
 *  On load, called to load the auth2 library and API client library.
 */
export function handleClientLoad(cRooms) {
	gapi.load('client:auth2', initClient.bind(null, cRooms));
}
/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient(cRooms) {
	gapi.client.init({
		clientId: CLIENT_ID,
		discoveryDocs: DISCOVERY_DOCS,
		scope: SCOPES
	}).then(function () {
		// Listen for sign-in state changes.
		/*
		 *		Issue lies here
		 * */
		gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus.bind(null, cRooms));
		// Handle the initial sign-in state.
		updateSigninStatus(cRooms, gapi.auth2.getAuthInstance().isSignedIn.get());
		authorizeButton.onclick = handleAuthClick;
		signoutButton.onclick = handleSignoutClick;
	});
}
/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(cRooms, isSignedIn) {
	if (isSignedIn) {
		authorizeButton.style.display = 'none';
		signoutButton.style.display = 'block';
		listTickets(cRooms);
	} else if (!isSignedIn) {
		authorizeButton.style.display = 'block'
		signoutButton.style.display = 'none'
		if (cRooms.length != 0) {
			cRooms.length = 0;
		}
	}
	
}
/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
	gapi.auth2.getAuthInstance().signIn().catch(object => {
		console.log('Error: ' + object.error + '\n');
		switch (object.error) {
			case 'popup_closed_by_user':
				console.log('To extract data from spreadsheet you musn\'t close sign in window.\n');
				break;
			case 'access_denied':
				console.log('User denied access to given scopes.\n');
				break;
			case 'immediate_failed':
				console.log('Immediate failure.')
		}
	})

}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
	gapi.auth2.getAuthInstance().signOut();
	console.log('Signed out');
}
// /**
//  * Append a pre element to the body containing the given message
//  * as its text node. Used to display the results of the API call.
//  *
//  * @param {string} message Text to be placed in pre element.
//  */
// function appendPre(message) {
// 	var pre = document.getElementById('content');
// 	var textContent = document.createTextNode(message + '\n' + '\n');
// 	pre.appendChild(textContent);
// }
function listTickets(cRooms) {
	gapi.client.sheets.spreadsheets.values.get({
		spreadsheetId: '196lNOIgV-n_010Sysg07bf3_R4CP3Fb2mc-Bz3CKdmk',
		range: 'Live',
	}).then(function (response) {
		let roomNumber = [];
		response.result.values.forEach(element => {
			roomNumber.push(element[5]);
		});
		let uniqueRooms = findUnique(roomNumber);
		for (let i = 1; i < uniqueRooms.length; i++) {
			cRooms.push(new Rectangle(50, 50, 50, 50));
		}
	}, function (response) {
		console.log('Error: ' + response.result.error.message);
	})
}

function findUnique(arr) {
	const unique = (value, index, self) => {
		return self.indexOf(value) === index;
	}
	const uniqueValues = arr.filter(unique);
	return uniqueValues;
}
