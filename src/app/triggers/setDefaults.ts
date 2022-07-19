export default async function setDefaults(change: any, context: any)  {
    // ... Your code here
    const data = change.after.data();
    const changeRef = change.after.ref
    // const prevData = change.before.data();

    if(!data?.frozen) {
        changeRef.set({
            frozen: false
        }, {merge: true})
    }

    if(!data?.proccessed) {
        changeRef.set({
            processed: false
        }, {merge: true})
    }

    if (!data?.scraper_count) {
        changeRef.set({
            scraper_count: 0
        }, {merge: true})
    }

    if(!data?.timestamp) {
        changeRef.set({
            timestamp: context.timestamp
        },{merge: true})
    }


    return 
}