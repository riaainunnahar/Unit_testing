import { describe, it, expect, vi, afterEach } from "vitest";
import { getRandomDogImage } from "../services/dogService";

describe("dogService - getRandomDogImage", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("should return dog image data when API call is successful", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        status: 200,
        json: async () => ({
          message: "https://example.com/dog.jpg",
          status: "success",
        }),
      })) as any
    );

    const result = await getRandomDogImage();

    expect(result).toEqual({
      imageUrl: "https://example.com/dog.jpg",
      status: "success",
    });
  });

  it("should throw an error when API call fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: false,
        status: 500,
        json: async () => ({
          message: "Something went wrong",
          status: "error",
        }),
      })) as any
    );

    await expect(getRandomDogImage()).rejects.toThrow();
  });
});