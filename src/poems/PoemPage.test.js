const PoemPage = require("./PoemPage")
// @ponicode
describe("componentDidMount", () => {
    let inst

    beforeEach(() => {
        inst = new PoemPage.default()
    })

    test("0", async () => {
        await inst.componentDidMount()
    })
})
