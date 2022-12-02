import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { credential } from "firebase-admin/lib";

initializeApp({
  credential: credential.cert(credentials),
});

let totalUsers = 0;

const listAllUsers = (nextPageToken) => {
  getAuth()
    .listUsers(1000, nextPageToken)
    .then((listUsersResult) => {
      listUsersResult.users.forEach((userRecord) => {
        totalUsers++;
        console.log(`user => ${userRecord.toJSON()}`);
      });

      if (listUsersResult.pageToken) {
        listAllUsers(listUsersResult.pageToken);
      }
    })
    .catch((error) => {
      console.error(`Error listing users: ${error}`);
    });
};
