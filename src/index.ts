import * as functions from "firebase-functions";
import express from "express"
import HomeController from "./app/controllers/home";
import setDefaults  from "./app/triggers/setDefaults";
import scrapper from "./app/pub_sub/scrapper";
import ScrapperController from "./app/controllers/scrapper/index"
// import setCategories from "./app/triggers/setCategories"
// import axios from "axios";
export const app = express()

// routes
app.get('/', HomeController)
app.get('/scrap', ScrapperController)

export const api_v1 = functions.https.onRequest(app);
// Scheduled Scraper
export const scheduledScraper = functions.pubsub.schedule('*/50 * * * *').onRun(scrapper)

// Firestore trigger
export const setDefault = functions.firestore.document('sites/{siteId}').onWrite(setDefaults)
// populate scrapped data 
// export const populateScrappedData = functions.firestore.document('articles/{articleId}').onWrite(setCategories)

