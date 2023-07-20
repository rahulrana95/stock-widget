// utils.test.ts

import { debounce, fixKeys } from "../index";

// Mock setTimeout function
jest.useFakeTimers();

describe("debounce", () => {
  test("should debounce the inner function and return a promise", async () => {
    const innerFn = jest.fn().mockResolvedValue("result");
    const debouncedFn = debounce(innerFn, 200);

    const promise = debouncedFn(1, 2, 3);
    expect(innerFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(199);
    expect(innerFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    await expect(promise).resolves.toBe("result");
    expect(innerFn).toHaveBeenCalledWith(1, 2, 3);
  });
});

describe("fixKeys", () => {
  test("should fix keys in the array of objects", () => {
    const inputArr = [
      { "first name": "John", lastname: "Doe", age: "30" },
      { "first name": "Jane", lastname: "Smith", age: "25" },
    ];

    const expectedOutput = [
      { name: "John", lastname: "Doe", age: "30" },
      { name: "Jane", lastname: "Smith", age: "25" },
    ];

    const result = fixKeys(inputArr);

    expect(result).toEqual(expectedOutput);
  });
});
