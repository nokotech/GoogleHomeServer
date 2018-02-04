import request from 'supertest'
import assert from 'assert'

describe('get', () => {

    const agent = request.agent("http://localhost:8080") 

    it('Hello mocha', (done) => {
        agent.get("").end((err, res) => {
            if(err) throw err;
            assert.deepEqual( res.body, {call: false} );
            done();
        });
    })

})