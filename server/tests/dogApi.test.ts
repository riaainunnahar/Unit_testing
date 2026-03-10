import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../index";

describe("Dog API tests", () => {
  it("Test 1: should return random dog image successfully", async () => {
    const response = await request(app).get("/api/dogs/random");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("success", true);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("imageUrl");
    expect(typeof response.body.data.imageUrl).toBe("string");
  });

  it("Test 2: should return 404 for invalid route", async () => {
    const response = await request(app).get("/api/dogs/invalid");

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("success", false);
    expect(response.body).toHaveProperty("error", "Route not found");
  });
});