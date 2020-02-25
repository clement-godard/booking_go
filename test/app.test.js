const app = require('../app')

describe('tools test', () => {
    it('should test that fetchSupplier is undefined', async () => {
        const response = await fetchSupplier(null, null, null, null)
        expect(response).toBeUndefined()
    })

    //Not always runs due to nature of API
    it('should test that fetchSupplier will not be empty', async () => {
        const response = await fetchSupplier("dave", "51.470020,-0.454295", "51.5112079,-0.1215334", 1)
        expect(response.length).toBeGreaterThan(0)
    })
})


