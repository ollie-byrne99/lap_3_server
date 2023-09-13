const request = require("supertest");
const app = require('../app');

describe('api server', () => {

let api;

beforeAll(() => {

api = app.listen(5000, () => {

console.log('Test running on port 5000');
			})
})

		afterAll((done) => {
				console.log('Test server stopping')
				api.close(done); 
	
})
//test 1
test('it responds to get / status 200',  async() => {
 await request(api)
.get('/')
.expect(200)
})

test('responds to delete /users/:id with status 204',  (done) => {
	 request(api)
	.delete('/users/64ff2f2bb2f3b1c2ee5f0071')
	.expect(204, done)
	})
})