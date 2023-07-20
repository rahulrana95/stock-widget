// getTickerSuggestions.test.ts

import fetchMock from "jest-fetch-mock";
import getTickerSuggestions, {
  Ticker,
  getTickerSuggestionsResponse,
} from "../getTickets";

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

test("getTickerSuggestions resolves with ticker suggestions on successful API call", async () => {
  const symbol = "AAPL";
  const mockResponse: getTickerSuggestionsResponse = {
    tickers: [
      { symbol: "AAPL", name: "Apple Inc." },
      { symbol: "MSFT", name: "Microsoft Corporation" },
    ],
    errorMessage: "",
  };
  fetchMock.mockResponseOnce(
    JSON.stringify({ bestMatches: mockResponse.tickers })
  );

  const result = await getTickerSuggestions(symbol);

  expect(result).toEqual(mockResponse);
});

test('getTickerSuggestions throws an error if API call returns "Information" field', async () => {
  const symbol = "AAPL";
  fetchMock.mockResponseOnce(JSON.stringify({ Information: "Error message" }));

  try {
    await getTickerSuggestions(symbol);
  } catch (error: any) {
    // eslint-disable-next-line jest/no-conditional-expect
    expect(error.message).toBe("Soemthing is wrong.");
  }
});

test("getTickerSuggestions resolves with empty tickers and an error message on API call failure", async () => {
  const symbol = "AAPL";
  fetchMock.mockRejectOnce();

  const result = await getTickerSuggestions(symbol);

  expect(result).toEqual({
    tickers: [],
    errorMessage: "error",
  });
});
