      // Client ID and API key from the Developer Console
      var CLIENT_ID = config.CLIENT_ID;
  
      // Array of API discovery doc URLs for APIs used by the quickstart
      var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      var SCOPES = "https://www.googleapis.com/auth/spreadsheets";

	  export const uniqueRooms;
      var authorizeButton = document.getElementById('authorize_button');
      var signoutButton = document.getElementById('signout_button');

      /**
       *  On load, called to load the auth2 library and API client library.
       */
      function handleClientLoad() {
        gapi.load('client:auth2', initClient);
      }

      /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       */
      function initClient() {
        gapi.client.init({
          // apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        }).then(function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          authorizeButton.onclick = handleAuthClick;
          signoutButton.onclick = handleSignoutClick;
        });
      }

      /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
      function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          authorizeButton.style.display = 'none';
          signoutButton.style.display = 'block';
          listTickets();
        } else {
          authorizeButton.style.display = 'block';
          signoutButton.style.display = 'none';
        }
      }

      /**
       *  Sign in the user upon button click.
       */
      function handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
      }

      /**
       *  Sign out the user upon button click.
       */
      function handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node. Used to display the results of the API call.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function appendPre(message) {
        var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n' + '\n');
        pre.appendChild(textContent);
      }

      
      function listTickets() {
        gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: '196lNOIgV-n_010Sysg07bf3_R4CP3Fb2mc-Bz3CKdmk',
          range: 'Live',
        }).then(function(response) {
		  let roomNumber = [];
		  response.result.values.forEach(element => {
				roomNumber.push(element[5]);
		  });
		  
		  uniqueRooms = findUnique(roomNumber);
		  
		  console.log("unique:" + uniqueRooms);
		  console.log(uniqueRooms.length);

        }, function(response) {
          appendPre('Error: ' + response.result.error.message);
        });
	  }

	  function findUnique(arr){
		const unique = (value, index, self) => {
			return self.indexOf(value) === index;
		}
		
		const uniqueValues = arr.filter(unique);
		return uniqueValues;
	  }

   

    
    