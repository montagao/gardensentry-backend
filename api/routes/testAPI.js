var express = require("express");
var path = require("path");
var router = express.Router();

var sentryId = "goosesentry"; // must be strictly alphanumeric, lowercase
var blobService = azure.createBlobService("DefaultEndpointsProtocol=https;AccountName=gardensentrycdn;AccountKey=7V+S9ZazM7Y5r9JzylWsSR8Y2y/sSCwN2U5AutoSqcj7ojJdv504j9KcBIiXKf4lCLcySQlK1zhIGskHZAglYw==;EndpointSuffix=core.windows.net");
var snapshotDir = require('os').homedir() + "/snapshots/";

router.get("/", function(req, res, next) {

	res.sendFile( 'mock.png', {root: './views'});

	//res.send('sending sentry stats...');
	
});


function downloadBlobFromContainer( blobContainerName, blobName, filePath){
	blobService.getBlobToStream( blobContainerName, blobName, fs.createWriteStream(filePath),
		function(error, result, response) {
			if (!error) {
				// blob retrieved
				return true;
			} else {
				return false;
			}
		}
	);
}

module.exports = router;
