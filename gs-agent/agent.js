"use strict";

// TOOD: rewrite this in C
// work with Darknet code
// use video buffers

var azure = require('azure-storage');
const fs = require('fs');

// this id should be unique for the final product 
// used as the blob container name
// hard coded access key
// kinda insecure
var sentryId = "goosesentry"; // must be strictly alphanumeric, lowercase
var blobService = azure.createBlobService("DefaultEndpointsProtocol=https;AccountName=gardensentrycdn;AccountKey=7V+S9ZazM7Y5r9JzylWsSR8Y2y/sSCwN2U5AutoSqcj7ojJdv504j9KcBIiXKf4lCLcySQlK1zhIGskHZAglYw==;EndpointSuffix=core.windows.net");
var snapshotDir = require('os').homedir() + "/snapshots/";


function main(){
	//callback hell
	return createBlobContainer( blobService, sentryId, function(error, result, response) {
		if (!error) {
			if (result){
				console.log("OK: Created Blob container:" + sentryId );
			} else {
				console.log("OK: Blob container already exists:" + sentryId );
			}
			scanForSnapshots(
				function( err, items ){
					if (items.length === 0) {
						console.log("DEBUG: No snapshots found.");
					}
					items.forEach( item => {
						console.log("DEBUG:"+ item);
					})
					let snapshotVids = items.filter( item => {
						let videoFilePattern = /.+\.(mov|mp4|webm|avi|flv)/g;
						return !!item.match(videoFilePattern);
					})
					snapshotVids.forEach( vidName => {
						uploadBlobToContainer(blobService, sentryId, vidName, snapshotDir+vidName, 
							function(error, result, response) {
									if (!error) {
										console.log(`OK: Uploaded snapshot: ${vidName} to ${sentryId} as ${vidName}`  );
										// file uploaded
										// delete
										fs.unlink(snapshotDir+vidName, (err) => {
											if (err) throw err;
											console.log(`${snapshotDir+vidName} was deleted.`);
										});
										return true;
									} else {
										console.log(`ERROR: Couldn't upload snapshot: ${vidName} to ${sentryId} as ${vidName}!`  );
										console.log(`ERROR: error:${error}`  );
										return false;
									}
								}

						);
					});
				}
			)
			return true;
		} else {
			console.log("ERROR: Blob container couldn't be created" + containerName );
			return false;
		}
	});
}


function scanForSnapshots(cb){
	console.log("DEBUG: Scanning: " + snapshotDir + " for snapshot vids...");
	fs.readdir( snapshotDir, cb);
}


function createBlobContainer( blobService, containerName, cb ){
	blobService.createContainerIfNotExists(containerName, {
		publicAccessLevel: 'blob'
		},cb );
}

// uploading a file as a block blob
function uploadBlobToContainer( blobService, blobContainerName, blobName, filename, callback){
	blobService.createBlockBlobFromLocalFile( blobContainerName, blobName, filename, callback);
}

/**
 * Downloading a file to a stream
 * 
 * might be useful later
 */
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


main();

