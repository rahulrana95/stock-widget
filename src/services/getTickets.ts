import getTicketsData from "../fixtures/getTickets.json";
export interface Ticker {
  [key: string]: string;
}

export interface getTickerSuggestionsResponse {
  tickers: Ticker[];
  errorMessage: string;
}

const apiKey = process.env.REACT_APP_ALPHA_ADVANTAGE_KEY;

function getTickerSuggestions(
  symbol: string
): Promise<getTickerSuggestionsResponse> {
  return new Promise(async (resolve) => {
    let finalResult: getTickerSuggestionsResponse = {
      tickers: [],
      errorMessage: "",
    };

    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${apiKey}`
      );
      const result: {
        bestMatches: Ticker[];
        Information?: string;
      } = await response.json();

      if (result.Information) {
        throw Error("Soemthing is wrong.");
      }

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
