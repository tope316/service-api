import { ServiceBroker } from 'moleculer'
const { ValidationError } = require("moleculer").Errors
const TestService = require("../../../services/auth.service")

describe("TEST 'auth' Service", () => {
	let broker = new ServiceBroker({ logger: false })
	broker.createService(TestService)

	beforeAll(() => broker.start())
	afterAll(() => broker.stop())

	describe("auth: authenticate", () => {

		it("should return with 'System Administrator'", async () => {
			const res = await broker.call("v1.auth.authenticate", { username: "admin", password: "not4u2know", type: "OPERATOR" })
			expect((res as any).data.user.name).toBe("System Administrator")
		})

	})

})

