import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

exports.uploadTask = functions.firestore.document('tasks/{taskId}').onCreate((snap, context) => {
  console.log('Function upload called');
  return new Promise((resolve, reject) => {
    const task = snap.data();
    console.log('initialising picture logic');
    if (task && task.imgBase64) {
      console.log('imgBase64 found');
      const dbRefNew = admin.database().ref();
      const key = dbRefNew.push().key;
     // const img = new Image();
      // img.src = task.imgBase64;
      if(key) {
        const split = task.imgBase64.toString().split(',');
        const base64EncodedImageString = split[1],
          fileName = key.toString(),
          mimeType = 'image/jpeg',
          imageBuffer = new Buffer(base64EncodedImageString, 'base64');
        task.body = task.body + " testies";
        console.log('logic done ');
       admin.storage().bucket().file(fileName).save(imageBuffer, { metadata: { contentType: mimeType }})
         .then(stuff => {
         task.imgId = fileName;
          task.imgBase64 = null;
          admin.firestore(admin.app()).collection('tasks').doc(snap.id).set(task).then(val => {
            console.log('img saved maybe');
            resolve(val);
          }).catch(e => {
            console.log(e);
            reject(e);
          });
       }).catch(err => {
         console.log(err);
         reject(err);
       }); } else {
        reject('Key is missing');
      }
    }
  })
});
/*
exports.deleteTask = functions.firestore.document('tasks/{taskId}').onDelete(((snapshot, context) => {

}))

 exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
 });
*/
