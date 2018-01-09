import * as functions from 'firebase-functions';

// Start writing Firebase Functions
export const helloWorld = functions.https.onRequest((request, response) => {
    const text = request.query.text;
    console.log(text);
    response.send("Hello from Firebase!");
    response.status(200);
});
