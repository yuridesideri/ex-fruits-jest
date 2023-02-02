import httpStatus from "http-status";
import { app } from "index";
import supertest from "supertest";


const api = supertest(app);

beforeEach(async () =>{

})

describe("GET /fruits", () => {
    it("should return 200 OK and array of fruit objects", async () => {
        const response = await api.get("/fruits");

        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                price: expect.any(Number)
            })
        ]))
        expect(response.status).toBe(httpStatus.OK); 
    });
})

describe("GET /fruits/:id", () => {
    it ("should return NOT_FOUND(404) when id is invalid", async() => {
        const id = 0;
        const response = await api.get(`/fruits/${id}`);
        expect(response.status).toBe(httpStatus.NOT_FOUND);
    })


    it("should return 200 OK and fruit object", async () => {
        const id = 1;
        const response = await api.get(`/fruits/${id}`);

        expect(response.body).toEqual(expect.objectContaining({
            id: id,
            name: expect.any(String),
            price: expect.any(Number)
        }))
        expect(response.status).toBe(httpStatus.OK); 
    })
})


describe("POST /fruits", () => {
    it ("should return CONFLICT(409) when fruit already has the same name", async () => {
        const fruit = {
            name: "Banana",
            price: 2.5
        }

        const response = await api.post("/fruits").send(fruit);

        expect(response.status).toBe(httpStatus.CONFLICT);
    })

    it ("should return 201", async () => {
        const fruit = {
            name: "Pera",
            price: 2.5
        }

        const response = await api.post("/fruits").send(fruit);
        expect(response.status).toBe(httpStatus.CREATED);
    } )
})