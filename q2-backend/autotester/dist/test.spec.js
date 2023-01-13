"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
describe("Part 1", () => {
    describe("POST /entity", () => {
        const createEntities = async (entities) => {
            return await (0, supertest_1.default)("http://localhost:8080")
                .post("/entity")
                .send({ entities });
        };
        it("creates new entities", async () => {
            const entities = [
                {
                    type: "space_cowboy",
                    metadata: { name: "Buckaroo Banzai", lassoLength: 10 },
                    location: { x: 1, y: 2 },
                },
                {
                    type: "space_animal",
                    metadata: { type: "flying_burger" },
                    location: { x: 3, y: 4 },
                },
            ];
            const response = await createEntities(entities);
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: "Entities created" });
        });
        it("creates new entities with valid input", async () => {
            const entities = [
                {
                    type: "space_animal",
                    metadata: { type: "pig" },
                    location: { x: -200, y: 4 },
                },
                {
                    type: "space_cowboy",
                    metadata: { name: "Buckaroo Banzai", lassoLength: 10 },
                    location: { x: 100, y: 2 },
                },
            ];
            const response = await createEntities(entities);
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: "Entities created" });
        });
        it("creates new entities with valid input", async () => {
            const entities = [
                {
                    type: "space_animal",
                    metadata: { type: "cow" },
                    location: { x: 1, y: 2 },
                },
                {
                    type: "space_animal",
                    metadata: { type: "flying_burger" },
                    location: { x: 3, y: 4 },
                },
            ];
            const response = await createEntities(entities);
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: "Entities created" });
        });
    });
});
describe("Part 2", () => {
    const mockData = [
        // Can reach the pig and cow
        {
            type: "space_cowboy",
            metadata: { name: "Buckaroo Banzai", lassoLength: 3 },
            location: { x: 1, y: 2 },
        },
        // Can reach only the flying_burger
        {
            type: "space_cowboy",
            metadata: { name: "Eliot Ness", lassoLength: 2 },
            location: { x: 3, y: 4 },
        },
        {
            type: "space_animal",
            metadata: { type: "pig" },
            location: { x: 4, y: 2 },
        },
        {
            type: "space_animal",
            metadata: { type: "cow" },
            location: { x: 2, y: 2 },
        },
        {
            type: "space_animal",
            metadata: { type: "flying_burger" },
            location: { x: 3, y: 5 },
        },
    ];
    const getLassoable = async (name) => {
        return await (0, supertest_1.default)("http://localhost:8080")
            .get("/lassoable")
            .send({ cowboy_name: name });
    };
    beforeAll(async () => {
        await (0, supertest_1.default)("http://localhost:8080")
            .post("/entity")
            .send({ entities: mockData });
    });
    describe("GET /lassoable", () => {
        it("should calculate the right distances for Buckaroo Banzai", async () => {
            const expected = [
                {
                    type: "pig",
                    location: { x: 4, y: 2 },
                },
                {
                    type: "cow",
                    location: { x: 3, y: 3 },
                },
            ];
            const response = await getLassoable("Buckaroo Banzai");
            expect(response.status).toBe(200);
            expect(response.body).toEqual(expected);
        });
        it("should calculate the right distances for Eliot Ness", async () => {
            const expected = [
                {
                    type: "flying_burger",
                    location: { x: 3, y: 5 },
                },
            ];
            const response = await getLassoable("Eliot Ness");
            expect(response.status).toBe(200);
            expect(response.body).toEqual(expected);
        });
    });
});
//# sourceMappingURL=test.spec.js.map