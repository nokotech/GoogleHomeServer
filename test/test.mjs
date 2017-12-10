import request from 'supertest'
import assert from 'assert'

describe('get', () => {

    it('Hello mocha', (done) => {
        var msg = 'mocha';
        request("http://localhost:8091")
        .get('/')
        .expect(200)
        .end(function(err, res){
            if(err) throw err;
            assert.deepEqual( res.body, {call: true} );
            done();
        });
        
    })

})