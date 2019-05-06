var request = require('request');

// Pull the repoOwner and repoName from the command line
var clRepoOwner = process.argv[2];
var clRepoName = process.argv[3];
function getRepoContributors(repoOwner, repoName, cb) {
  // ...
  console.log(repoOwner, " owns ", repoName);
}
getRepoContributors(clRepoOwner, clRepoName);