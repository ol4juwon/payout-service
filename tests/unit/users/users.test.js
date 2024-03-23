const db = require("../../../models")

describe('User tests', () => {

    let pgDb = db;
    beforeAll(async  () => {
        await pgDb.sequelize.sync({force:true})
    })

    it('test with valid data', () => {
        
    });
    afterAll(async () => {
        await pgDb.sequelize.close()
      })
});
