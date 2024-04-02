const { faker } = require("@faker-js/faker");
const providerService = require("../../../app/providers/provider.service");
const slug = faker.company.buzzNoun();
const payload = {id:faker.string.uuid(),name: faker.string.alpha(),slug,value:slug, createdBy: "ad795f13-7b56-4933-8b6d-ac9da2db4b40", description: faker.string.alpha(100)}

describe('Provider Unit tests', () => { 
    beforeAll(async  () => {
    
    })

    it('Create a valid provider', async () => {
        // console.log("===>",{payload},"\n\n\n\n")
        await providerService.addProvider(payload).then(res => {
            expect(res.code).toBe(201);
            expect(res.data.createdBy).toBeTruthy();
        })
    });
    it('Create with incomplete details', async () => {
        const modPayload = payload;
        delete modPayload.createdBy;
        await providerService.addProvider(modPayload).then(res => {
            expect(res.code).toBe(422);
        })
    });
    it('Create with exist provider details', async() =>{
        await providerService.addProvider(payload).then(res => {
            expect(res.code).toBe(422);
        })
    })

    it('get all providers', async () => {
        await providerService.getProviders(1, 10).then(res => {
            expect(res.code).toEqual(200);
            expect(res.data).toHaveLength(2);
        })
    })
    it('get valid  provider', async () => {
        await providerService.getSingleProvider('8ecc79ce-2762-4525-9187-b8ed56624a2c').then(res =>{
            expect(res.code).toEqual(200);
            expect(res.data).toHaveProperty("id");
        })
    })
    it('get invalid  provider with valid uuid', async () => {
        await providerService.getSingleProvider(faker.string.uuid()).then(res =>{
            expect(res).toHaveProperty("error");
            expect(res.code).toEqual(404);
        })
    })

    it('get invalid  provider with invalid uuid', async () => {
        await providerService.getSingleProvider(faker.string.uuid).then(res =>{
            expect(res).toHaveProperty("error");
            expect(res.code).toEqual(500);
        })
    })
    it('get all active providers', async () => {
        await providerService.getProviders({active: true}).then(res=>{
            expect(res.data.length).toBeGreaterThan(0);
            expect(res.data[0].active).toBeTruthy();
        })
    })
    it('deactivate provider', async () =>{
        await providerService.toggleActive('8ecc79ce-2762-4525-9187-b8ed56624a2c', false).then(res =>{
            expect(res).toHaveProperty("data")
            expect(res.data).toHaveProperty("active", false)
        })
    })
    it('deactivate  already disabled provider', async () =>{
        await providerService.toggleActive('8ecc79ce-2762-4525-9187-b8ed56624a2c', false).then(res =>{
            expect(res).toHaveProperty("error")
            expect(res.code).toBe(422)
        })
    })
    it('activate provider', async () =>{
        await providerService.toggleActive('8ecc79ce-2762-4525-9187-b8ed56624a2c', true).then(res =>{
            expect(res).toHaveProperty("data")
            expect(res.data).toHaveProperty("active", true)
        })
    })

    it('disable invalid uuid', async () =>{
        await providerService.toggleActive(faker.string.uuid,false).then(res =>{
            expect(res).toHaveProperty("error")
            expect(res.code).toBe(500)
        })
    })

    it('activate provider with invalid uuid', async () =>{
        await providerService.toggleActive(faker.string.uuid(), true).then(res =>{
            expect(res).toHaveProperty("error")
            expect(res.code).toEqual(404)
        })
    })
    it('setDefault provider', async () =>{
        await providerService.setDefault('8ecc79ce-2762-4525-9187-b8ed56624a2c').then(res =>{
            expect(res).toHaveProperty("data")
            expect(res.data).toHaveProperty("isDefault", true)
        })
    })
    
 })