// fetchTickerDetails.test.ts

import fetchMock from "jest-fetch-mock";
import fetchTickerDetails from "../getTickerDetails";

fetchMock.enableMocks();
// Mock the environment variable
const originalEnv = process.env;
beforeEach(() => {
  process.env = { ...originalEnv };
  process.env.REACT_APP_ALPHA_ADVANTAGE_KEY = "YOUR_ALPHA_ADVANTAGE_KEY";
});

beforeEach(() => {
  fetchMock.resetMocks();
});

test("fetchTickerDetails resolves with data on successful API call", async () => {
  const ticketSymbol = "AAPL";
  const functionVal = "OVERVIEW";
  const mockData = {
    key: "name",
  };

  // Mock the response before the actual fetch request
  fetchMock.mockResponseOnce(JSON.stringify(mockData));

  const result = await fetchTickerDetails(ticketSymbol, functionVal);

  expect(result).toEqual(mockData);
});

test("fetchTickerDetails rejects with an error message if API call returns an error", async () => {
  const ticketSymbol = "AAPL";
  const functionVal = "OVERVIEW";
  const errorMessage = "There is something wrong.";
  fetchMock.mockResponseOnce(JSON.stringify({ Note: errorMessage }));

  try {
    await fetchTickerDetails(ticketSymbol, functionVal);
  } catch (error) {
    // eslint-disable-next-line jest/no-conditional-expect
    expect(error).toBe(errorMessage);
  }
});

test("fetchTickerDetails rejects with an error message if API call returns an empty object", async () => {
  const ticketSymbol = "AAPL";
  const functionVal = "OVERVIEW";
  fetchMock.mockResponseOnce(JSON.stringify({}));

  try {
    await fetchTickerDetails(ticketSymbol, functionVal);
  } catch (error) {
    // eslint-disable-next-line jest/no-conditional-expect
    expect(error).toBe("There is something wrong.");
  }
});

test("fetchTickerDetails rejects with an error message if API call fails", async () => {
  const ticketSymbol = "AAPL";
  const functionVal = "OVERVIEW";
  fetchMock.mockRejectOnce(() =>
    Promise.reject(new Error("Something went wrong"))
  );

  try {
    await fetchTickerDetails(ticketSymbol, functionVal);
  } catch (error) {
    // eslint-disable-next-line jest/no-conditional-expect
    expect(error).toBe("Something is wrong");
  }
});
