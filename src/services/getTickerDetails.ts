import getTicketDetailsOfATickerData from "../fixtures/getTicketDetailsOfATicker.json";

const apiKey = process.env.ALPHA_ADVANTAGE_KEY;

function fetchTickerDetails(
  ticketSymbol: string,
  functionVal: string = "OVERVIEW"
) {
  const apiUrl = `https://www.alphavantage.co/query?function=${functionVal}&symbol=${ticketSymbol}&apikey=${apiKey}`;

  return new Promise((resolve) => {
    resolve(getTicketDetailsOfATickerData);
    return;
    fetch(apiUrl)
      .then((response) => response.json())
      .then(
        (data: {
          "Global Quote": {
            [key: string]: string;
          };
        }) => {
          // Process the response data as needed
          const newTicket: { [key: string]: string } = {};

          Object.entries(data["Global Quote"]).forEach(([key, value]) => {
            const newKey: string | undefined = key.split(" ").pop() ?? "";

            newTicket[newKey] = value;
          });

          resolve(newTicket);
        }
      )
      .catch((error) => {
        console.error("Error fetching ticket details:", error);
      });
  });
}

export default fetchTickerDetails;
