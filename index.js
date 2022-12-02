import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import admin from "firebase-admin";
import credentials from "./key.json" assert { type: "json" };

initializeApp({
  credential: admin.credential.cert(credentials),
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
        // list the next batch of users
        listAllUsers(listUsersResult.pageToken);
      }
      console.log(`Total users: ${totalUsers}`);
    })
    .catch((error) => {
      console.error(`Error listing users: ${error}`);
    });
};

listAllUsers();
