const { faker } = require('@faker-js/faker');
const userService =  require( "../../../app/v1/users/users.service");
describe('User tests', () => {

    beforeAll(async  () => {


    
    })

    it('get all users',  async () => {
       await userService.getUsers().then((res)=>{
            expect(res).toBeTruthy();
            // console.log(typeof res.data, res?.data);
            expect(typeof res.data).toBe('object')
        })
    });
    it('get One user', async () =>{
        const id = faker.string.uuid();
        await userService.getOneUser(id).then(res => {
            expect(res).toBeTruthy();
            // console.log(typeof res.data, res?.data);
            // expect(typeof res.data).toBe('object')
        }).catch();
    })

    afterAll(async () => {
        // await pgDb.sequelize.close()
      })
});
