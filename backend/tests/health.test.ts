import request from "supertest";
import app from "../src/app";

describe("Health Check API", () => {
  it("GET /api/v1/health should return status UP and success true", async () => {
    const res = await request(app).get("/api/v1/health");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe("UP");
  });
});
