import * as _ from 'lodash'
// Imports the Google Cloud client library.
import * as Storage from '@google-cloud/storage';

class GoogleAuthenticationAPI {

    async getBuckets() : Promise<{}> {
        return new Promise((resolve, reject) => {

            // Makes an authenticated API request.
            Storage().getBuckets()
            .then((results : any) => {
                console.log('[SUCCESS] getBuckets :',  _.map(results[0], 'name'));
                resolve('success');
            })
            .catch((err : any) => {
                console.error('[ERROR] getBuckets :', err);
                reject(err);
            });

        });
    }
}

export default new GoogleAuthenticationAPI();
