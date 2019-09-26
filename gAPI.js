import {Classroom} from "./Classroom.js";
import {WINDOWHEIGHT, WINDOWWIDTH, classController} from "./Main.js";

// Client ID and API key from the Developer Console
let CLIENT_ID = config.CLIENT_ID;
// Array of API discovery doc URLs for APIs used by the quickstart
let DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
let SCOPES = "https://www.googleapis.com/auth/spreadsheets";
let authorizeButton = document.getElementById('authorize_button');
let signoutButton = document.getElementById('signout_button');
/**
 *  On load, called to load the auth2 library and API client library.
 */
export function handleClientLoad(clsController) {
	gapi.load('client:auth2', {
		callback: initClient.bind(null,clsController)	
	}
	);
}
/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient(clsController) {
	gapi.client.init({
		clientId: CLIENT_ID,
		discoveryDocs: DISCOVERY_DOCS,
		scope: SCOPES
	})
	.then(function () {
		// Listen for sign-in state changes.
		gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus.bind(null, clsController));
		// Handle the initial sign-in state.
		updateSigninStatus(clsController, gapi.auth2.getAuthInstance().isSignedIn.get());
		signoutButton.onclick = handleSignoutClick;
	});
}
function updateSigninStatus(clsController, isSignedIn) {
	if (isSignedIn) {
		signoutButton.style.display = 'block';
		//TODO: Get rid of this. GetData should be an option otherwise
		// initial login will be slow.
	} else if (!isSignedIn) {
		signoutButton.style.display = 'none'
		handleAuthClick();
		if (clsController.length != 0) {
			clsController.length = 0;
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
// 	let pre = document.getElementById('content');
// 	let textContent = document.createTextNode(message + '\n' + '\n');
// 	pre.appendChild(textContent);
// }
function getData(clsController){
	gapi.client.sheets.spreadsheets.values.get({
		spreadsheetId: '196lNOIgV-n_010Sysg07bf3_R4CP3Fb2mc-Bz3CKdmk',
		range: 'Live',
	}).then(function (response) {
		let tickets = [];
		response.result.values.forEach(element => {
			tickets.push(element[5]);
		});
		let uniqueRooms = findUnique(tickets);
		//You need to normalize the results
		//Find a consistent pattern 
		for(let entry of uniqueRooms){
			console.log(`${sanitizeData(entry.toUpperCase())}`)
			// console.log(formatData());
		}
		
	}, function (response) {
		console.log('Error: ' + response.result.error.message);
	})
}

function findUnique(arr) {
	const unique = (value, index, self) => {
		//Checks for the first occurence of value.
		//If indexOf value is not the same as the current index then that means
		// that number has occured once before and isn't pushed on.
		return self.indexOf(value) === index;
	}
	//An array filled with only those values which passed the unique filter.
	const uniqueValues = arr.filter(unique);
	return uniqueValues;
}

/**
 * @param {string} data - string containing room info
 */
//TODO:Sanitize room input data using regex
function sanitizeData(data){
	let Rule  = /([a-z]{1})(-)*(\d+)/i
	let uniqueSanitized=[];
		if (Rule.test(data)){
			let extracted=data.match(Rule);
			if(parseInt(extracted[3])<10){
				uniqueSanitized.push(`${extracted[1]}-0${parseInt(extracted[3])}`);
			}
			else{
				uniqueSanitized.push(`${extracted[1]}-${parseInt(extracted[3])}`);
			}
		}	
		else { return `Data: '${data}', invalid input`};
		return uniqueSanitized;		
}