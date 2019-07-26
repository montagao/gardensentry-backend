// Use Defaults
// Pass Options - the example below actually uses the default values from the environment
var account = process.env.AZURE_STORAGE_ACCOUNT;
//var key = process.env.AZURE_STORAGE_ACCESS_KEY;
const key = "7V+S9ZazM7Y5r9JzylWsSR8Y2y/sSCwN2U5AutoSqcj7ojJdv504j9KcBIiXKf4lCLcySQlK1zhIGskHZAglYw==";
// var cs = process.env.AZURE_STORAGE_CONNECTION_STRING;
const cs = "DefaultEndpointsProtocol=https;AccountName=gardensentrycdn;AccountKey=7V+S9ZazM7Y5r9JzylWsSR8Y2y/sSCwN2U5AutoSqcj7ojJdv504j9KcBIiXKf4lCLcySQlK1zhIGskHZAglYw==;EndpointSuffix=core.windows.net"

var storage = require('azure-storage-simple')(account || cs, key || null);

// blob(containerName, containerOptions)
// child methods will call createContainerIfNotExists one time.
var blob = storage.blob('user1', {publicAccessLevel : 'blob'});
// ### read(path,[options]) => Buffer ###
var myBuffer = blob.read('blobName.mov').then( myBuffer =>{
    var myText = myBuffer.toString(); //decode from utf8 / default
    console.log(myText);
});

/*

// ### write(path,[options],data) ###

// text/plain, charset=UTF-8
var result = await blob.write('some/path/file.txt', 'this is a string');

// application/json
var result = await blob.write('some/path/file.json', {foo:'bar'});

// application/octet-stream (default)
var result = await blob.write('some/path/file.bin', someBuffer);

// options for createBlockBlobFromStream
var result = await blob.write(
  'some/path/image.png'
  ,{
    contentType: 'image/png'
    //,contentEncoding: 'gzip' // specify encoding if you 'gzip' or 'deflate' your content
  }
  ,imageBuffer
);



var myBuffer = await blob.read('some/path/file.json');
var myObj = JSON.parse(myBuffer.toString()); //decode stored json above..


// ### delete(path,[options])
await blob.delete('some/path/file.ext');
*/