var request = require('request');
var testSite = "https://api.github.com/repos/jquery/jquery/contributors"


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

  console.log(data);
}
// Sample
getRepoContributors("jquery", "jquery", displayData);