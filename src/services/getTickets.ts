import getTicketsData from "../fixtures/getTickets.json";
export interface Ticker {
  [key: string]: string;
}

interface getTickerSuggestionsResponse {
  tickers: Ticker[] | null;
  errorMessage: string;
}

const apiKey = process.env.ALPHA_ADVANTAGE_KEY;

async function getTickerSuggestions(
  symbol: string
): Promise<getTickerSuggestionsResponse> {
  try {
    const response =
      { json: () => {} } ??
      (await fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${apiKey}`
      ));
    const result: {
      bestMatches: Ticker[];
    } = getTicketsData ?? (await response.json());

    return {
      tickers: result.bestMatches.map((ticket) => {
        const newTicket: { [key: string]: string } = {};
        Object.entries(ticket).forEach(([key, value]) => {
          const newKey: string | undefined = key.split(" ").pop() ?? "";

          newTicket[newKey] = value;
        });
        return newTicket;
      }),
      errorMessage: "",
    };
  } catch (error) {
    return {
      tickers: [],
      errorMessage: "error",
    };
  }
}

export default getTickerSuggestions;
