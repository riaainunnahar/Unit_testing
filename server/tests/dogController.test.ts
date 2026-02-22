import { describe, it, expect, vi, afterEach } from "vitest";
import { getDogImage } from "../controllers/dogController";

vi.mock("../services/dogService", () => ({
  getRandomDogImage: vi.fn(),
}));

import { getRandomDogImage } from "../services/dogService";

describe("dogController - getDogImage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return success true and data when service succeeds", async () => {
    (getRandomDogImage as any).mockResolvedValue({
      imageUrl: "https://example.com/dog.jpg",
      status: "success",
    });

    const req: any = {};
    const res: any = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    await getDogImage(req, res);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: {
        imageUrl: "https://example.com/dog.jpg",
        status: "success",
      },
    });
  });
});