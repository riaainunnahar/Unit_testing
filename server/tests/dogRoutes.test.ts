import { describe, it, expect, vi, afterEach } from "vitest";
import express from "express";
import request from "supertest";

import dogRoutes from "../routes/dogRoutes";

vi.mock("../controllers/dogController", () => ({
  getDogImage: vi.fn(),
}));

import { getDogImage } from "../controllers/dogController";

describe("dogRoutes", () => {
  const app = express();
  app.use(express.json());
  app.use("/api/dogs", dogRoutes);

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("GET /api/dogs/random should return 200 (positive)", async () => {
    (getDogImage as any).mockImplementation((req: any, res: any) => {
      return res.status(200).json({ ok: true });
    });

    const res = await request(app).get("/api/dogs/random");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });

  it("GET /api/dogs/random should return 500 when controller throws (negative)", async () => {
    (getDogImage as any).mockImplementation(() => {
      throw new Error("boom");
    });

    const res = await request(app).get("/api/dogs/random");

    expect(res.status).toBe(500);
  });
});