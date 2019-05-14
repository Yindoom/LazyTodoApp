import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

exports.uploadTask = functions.firestore.document('tasks/{taskId}').onCreate((snap, context) => {
  console.log('Function upload called');
  return new Promise(async (resolve, reject) => {
    const task = snap.data();
    if (task && task.imgBase64) {
      const split = task.imgBase64.toString().split(/[,;:]/);
      console.log(split[0]);

      if (split[0] === 'data') {
        if(task.imgId) {
          admin.storage().bucket().file(task.imgId).delete()
            .then(() => console.log('Previous image deleted'))
            .catch(e => console.log(e));
        }
        console.log('imgBase64 found');

        const key = admin.database().ref().push().key;

        if (key) {
          const base64EncodedImageString = split[3],
            fileName = key.toString(),
            mimeType = split[1],
            imageBuffer = new Buffer(base64EncodedImageString, split[2]);
          console.log('Image logic converted');

          try {

            await admin.storage().bucket().file("task-pictures/" + fileName)
              .save(imageBuffer, {metadata: {contentType: mimeType}});

            /*admin.storage().bucket().file("task-pictures/" + fileName).getSignedUrl({action: 'read', expires: '01/01/3000'})
              .then(urls => {
                task.imgBase64 = urls[0];
              }).catch(e => console.log(e));*/
            task.imgBase64 = null;
            task.imgId = fileName;
            await admin.firestore(admin.app()).collection('tasks').doc(snap.id).set(task).then();

          } catch (e) {
            console.log(e);
            reject(e);
          }} else {
          reject('Key is missing');
        }
      }
    }
    resolve('Function completed');
    console.log('Function complete');
  })
});

exports.deleteImage = functions.firestore.document('tasks/{taskId}').onDelete((snap, context) => {
  return new Promise((resolve, reject) => {
    const task = snap.data();
    if(task && task.imgId) {
      console.log('Image for deletion found ' + task.imgId);
      admin.storage().bucket().file("task-pictures/" + task.imgId).delete().then(() => {
        console.log('Img deleted');
        resolve('Img Deleted');
      }).catch(e => {
        console.log(e);
        reject('Error happened '+ e);
      });
    }
  })
});

exports.updateTask = functions.firestore.document('tasks/{taskId}').onUpdate((snap, context) => {
  console.log('Function upload called');
  return new Promise(async (resolve, reject) => {
    const task = snap.after.data();
    if (task && task.imgBase64) {
      const split = task.imgBase64.toString().split(/[,;:]/);
      console.log(split[0]);

      if (split[0] === 'data') {
        if(task.imgId) {
          admin.storage().bucket().file(task.imgId).delete()
            .then(() => console.log('Previous image deleted'))
            .catch(e => console.log(e));
        }
        console.log('imgBase64 found');

        const key = admin.database().ref().push().key;

        if (key) {
          const base64EncodedImageString = split[3],
            fileName = key.toString(),
            mimeType = split[1],
            imageBuffer = new Buffer(base64EncodedImageString, split[2]);
          console.log('Image logic converted');

          try {

            await admin.storage().bucket().file("task-pictures/" + fileName)
              .save(imageBuffer, {metadata: {contentType: mimeType}});

            /*admin.storage().bucket().file("task-pictures/" + fileName).getSignedUrl({action: 'read', expires: '01/01/3000'})
              .then(urls => {
                task.imgBase64 = urls[0];
              }).catch(e => console.log(e));*/
            task.imgId = fileName;

          } catch (e) {
            console.log(e);
            reject(e);
          }} else {
          reject('Key is missing');
        }
      }
      task.imgBase64 = null;
      await admin.firestore(admin.app()).collection('tasks').doc(snap.after.id).set(task).then();
    }
    resolve('Function completed');
    console.log('Function complete');
  })
});
