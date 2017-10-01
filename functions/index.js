const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

var xray = require('x-ray')();

var url = 'https://cereg.pnca.edu/p/adult';
console.log("Pulling from: " + url + "\n");

exports.findClasses = functions.https.onRequest((request, response) => {
  xray(url, ['.classdesc h3'])(function(err, result)
  {
    for (var i in result)
    {
      result[i] = result[i].trim();
    }
    response.send(result);
  })
});
