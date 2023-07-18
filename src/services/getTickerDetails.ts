import getTicketDetailsOfATickerData from "../fixtures/getTicketDetailsOfATicker.json";

const apiKey = process.env.ALPHA_ADVANTAGE_KEY;

function fetchTickerDetails(
  ticketSymbol: string,
  functionVal: string = "OVERVIEW"
) {
  const apiUrl = `https://www.alphavantage.co/query?function=${functionVal}&symbol=${ticketSymbol}&apikey=${apiKey}`;

  return new Promise((resolve, reject) => {
    // resolve(getTicketDetailsOfATickerData);
    // return;
    fetch(apiUrl)
      .then((response) => response.json())
      .then(
        (data: {
          "Global Quote": {
            [key: string]: string;
          };
          Note?: string;
          Information?: string;
        }) => {
          // Process the response data as needed
          const newTicket: { [key: string]: string } = {};

          if (data.Note || data.Information) {
            reject("There is something wrong.");
          } else {
            // Object.entries(data["Global Quote"]).forEach(([key, value]) => {
            //   const newKey: string | undefined = key.split(" ").pop() ?? "";

            //   newTicket[newKey] = value;
            // });

            // resolve(newTicket);
            resolve(data);
          }
        }
      )
      .catch((error) => {
        console.error("Error fetching ticket details:", error);
        reject(error.message);
      });
  });
}

export default fetchTickerDetails;
