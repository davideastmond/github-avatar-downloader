var request = require('request');
var fs = require("fs");
var testSite = "https://api.github.com/repos/jquery/jquery/contributors";


// Pull the repoOwner and repoName from the command line
var clRepoOwner = process.argv[2];
var clRepoName = process.argv[3];
function getRepoContributors(repoOwner, repoName, cb) {
  // ...
  // Ensure that the owner and repo_name fields are populated
  if (!repoOwner || !repoName) {
    // Undefined parameters, exit the function
    console.log("ERROR: Please specify a repo owner and name");
    return;
  }
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/" + "contributors",
    headers: {
      'User-Agent': 'davideastmond'
    }
  };

  /* Create a request to get the repo owner and contributors JSON for further processing in the call
  back function */
  request(options, function(err, res, body) {
    cb(err, body);
  });
  
}

// Get the data
function displayData(error, data) {
  if (error) {
    console.log("ERROR ", error);
    return;
  }

  // Get the JSON and parse it into a js object
  var parsedData = JSON.parse(data);
  
  // Print the URL of each image
  for (var i = 0; i < parsedData.length; i++) {
    // Create a local file path using the user's login name
     var filePath = "./avatars/" + parsedData[i].login + ".jpg";
     var URLData = parsedData[i].avatar_url;

     // As we iterate through the JSON object, issue requests to fetch the image data and store it on disk
     downloadImageByURL(URLData, filePath, parsedData[i].login); // TEST
  }
}

function downloadImageByURL(URL, finalPath, username, callback) {
  // Retrieve actual images and store them
  request.get(URL)
    .on ('error', (err)=> {
      // If there was an error, print the message to the console
      console.log("There was an error. ", err);
    })

    .on('response', (response)=> {
      // Read headers etc.
    })

    .on('end', ()=> {
      // The download has finished, console log for the completion of each user's downloaded image
      console.log("Image downloaded for user: ", username);
    })

    // Using the pipe, immediately write the stream to local file
    .pipe(fs.createWriteStream(finalPath));
}


// Call the function with process.argv parameters
getRepoContributors(clRepoOwner, clRepoName, displayData);