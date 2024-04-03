const { faker } = require('@faker-js/faker');
const userService =  require( "../../../app/v1/users/users.service");
const { USER } = require('../../../Constants');


describe('User tests', () => {

    beforeAll(async  () => {
    })

    it('get all users invalid params',  async () => {
       await userService.getUsers(page=1, limit= 10,orderBy="jjdj", sort="ddd").then((res)=>{
            expect(res).toBeTruthy();
            // console.log(typeof res.data, res?.data);
            expect(res.code).toBe(500)
            expect(res.data).toBeUndefined()
            expect(res.error).toBeDefined()
        })
    });

    it('get all users',  async () => {
        await userService.getUsers(page=1, limit= 10,orderBy="createdAt", sort="DESC").then((res)=>{
             expect(res).toBeTruthy();
             // console.log(typeof res.data, res?.data);
             expect(res.code).toBe(200)
             expect(res.data).toBeDefined()
             expect(res.data.total).toBeGreaterThan(0);
             expect(res.data.data.length).toBeLessThanOrEqual(10);
             expect(res.data.data.length).toBeGreaterThan(0);
         })
     });
    it('get One user valid uuid but doesn exist', async () =>{
        const id = faker.string.uuid();
        await userService.getOneUser(id).then(res => {
            expect(res).toBeTruthy();
            // console.log(typeof res.data, res?.data);
            expect(res.error).toBeDefined()
        }).catch();
    })

    it('get One user with invalid uuid', async () =>{
        await userService.getOneUser("099004").then(res => {
            expect(res).toBeTruthy();
            // console.log(typeof res.data, res?.data);
            expect(res.error).toBeDefined()
        }).catch();
    })

    it('get One user with valid id', async () =>{
        await userService.getOneUser("8ecc79ce-2762-4525-9187-b8ed56624a2c").then(res => {
            expect(res).toBeTruthy();
            // console.log(typeof res.data, res?.data);
            expect(typeof res.data).toBe('object')
        })
    })
    it('disable user', async () => {
        await userService.toggleUser("8ecc79ce-2762-4525-9187-b8ed56624a2c", false).then(res => {
            expect(res.code).toBe(200);
            // console.log(typeof res.data, res?.data);
            expect(res.data.active).toBe(false);
        })
    })
    it('disable user invalid user', async () => {
        await userService.toggleUser("8ecc79ce-2762-4525-9187-b8ed56624aec", false).then(res => {
            expect(res.code).toBe(404);
            // console.log(typeof res.data, res?.data);
            expect(res.error).toBeDefined();
        })
    })

    it('disable user invalid uuid', async () => {
        await userService.toggleUser("8ecc79ce-2762", false).then(res => {
            expect(res.code).toBe(400);
            // console.log(typeof res.data, res?.data);
            expect(res.error).toBeDefined();
        })
    })

    it('blacklist user valid user', async () =>{
        await userService.blacklistUser("b97f39df-2e43-4a70-8590-b7cbdb179ff6").then(res => {
            expect(res.code).toBe(200);
            // console.log(typeof res.data, res?.data);
            expect(res.data).toBeDefined();
            expect(res.data).toBe("blacklisted")
        })
    })
    it('blacklist user invalid user', async () =>{
        await userService.blacklistUser("2d13e446-dd33-4e51-b523-06101c268fad").then(res => {
            expect(res.code).toBe(404);
            // console.log(typeof res.data, res?.data);
            expect(res.error).toBeDefined();
            // expect(res.data).toBe("blacklisted")
        })
    })

    it('blacklist user invalid uuid', async () =>{
        await userService.blacklistUser("2d13e446-dd33").then(res => {
            expect(res.code).toBe(400);
            // console.log(typeof res.data, res?.data);
            expect(res.error).toBeDefined();
            // expect(res.data).toBe("blacklisted")
        })
    })
    it('create valid user', async () =>{
        const payload =      {
            firstName: "Ola",
            lastName: "Juwon",
            role: USER.ROLES.USER,
            email: "olajuwowal2012@gmail.com",
          }
        await userService.createUser(payload).then(res => {
            expect(res.code).toBe(201);
            expect(res.data).toBeDefined();
        })
    })

    it('create duplicate user', async () =>{
        const payload =      {
            firstName: "Ola",
            lastName: "Juwon",
            role: USER.ROLES.USER,
            email: "olajuwowal2012@gmail.com",
          }
        await userService.createUser(payload).then(res => {
            expect(res.code).toBe(400);
            expect(res.error).toBeDefined();
        })
    })

    it('create invalid user details', async () =>{
        const payload =      {
            firstName: "Ola",
            lastName: "Juwon",
            role: 'derf',
            email: "olajuwowal2012role1@gmail.com",
          }
        await userService.createUser(payload).then(res => {
            expect(res.code).toBe(422);
            expect(res.error).toBeDefined();
        })
    })
    afterAll(async () => {
      })
});
