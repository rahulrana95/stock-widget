import getTicketsData from "../fixtures/getTickets.json";
export interface Ticker {
  [key: string]: string;
}

export interface getTickerSuggestionsResponse {
  tickers: Ticker[];
  errorMessage: string;
}

const apiKey = process.env.ALPHA_ADVANTAGE_KEY;

function getTickerSuggestions(
  symbol: string
): Promise<getTickerSuggestionsResponse> {
  return new Promise(async (resolve) => {
    let finalResult: getTickerSuggestionsResponse = {
      tickers: [],
      errorMessage: "",
    };

    try {
      const response =
        // { json: () => {} } ??
        await fetch(
          `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${apiKey}`
        );
      const result: {
        bestMatches: Ticker[];
      } = await response.json();

      finalResult = {
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
      finalResult = {
        tickers: [],
        errorMessage: "error",
      };
    }
    resolve(finalResult);
  });
}

export default getTickerSuggestions;
