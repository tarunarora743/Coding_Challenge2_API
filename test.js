let supertest = require('supertest');
let expect = require('chai').expect;
var baseURL = 'https://automationexercise.com'

let randomString = (Math.random() + 1).toString(36).substring(3);
let postData = require('./data/testData.json')

//new email is required each time for creating a account. Using random string to generate new email string
postData.email = randomString + '@test.com';



describe('Running the API tests', function(){
    it('Getting the product list - Get Request', function(done){
        supertest(baseURL)
        .get('/api/productsList')
        .expect(200)
        .end(function(err, res){
            if(err){
                console.log(err);
                throw err;
            }
            else{
                resp = JSON.parse(res.text);
                console.log(resp);
                //Verifying the product name contains Blue Top
                expect(resp.products[0].name).to.equal('Blue Top');
            }
            done();
        })
    });

    it('Running the post request for creating a new user', function(done){
        supertest(baseURL)
        .post('/api/createAccount')
        .type('multiport/form-data')
        .field(postData)
        .expect(200)
        .end(function(err, res){
            if(err){
                console.log(err);
                throw err;
            }
            else{
                resp = JSON.parse(res.text);
                console.log(resp);
                //Expecting the responseCode to equal 201
                expect(resp.responseCode).to.equal(201);
                //verifying the response message
                expect(resp.message).to.equal('User created!');
            }
            done();
        })
    })
})