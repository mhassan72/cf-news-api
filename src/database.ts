// import * as functions from "firebase-functions"
import admin from "firebase-admin"
// import serviceAccount from "./service-account-credentials.json"
const serviceAccount = require("./service-account-credentials.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sports-news-5fd0a-default-rtdb.europe-west1.firebasedatabase.app"
})

export const fireStore = admin.firestore()
fireStore.settings({ ignoreUndefinedProperties: true })