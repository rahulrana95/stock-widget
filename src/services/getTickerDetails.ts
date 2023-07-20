import getTicketDetailsOfATickerData from "../fixtures/getTicketDetailsOfATicker.json";

const apiKey = process.env.REACT_APP_ALPHA_ADVANTAGE_KEY;

function fetchTickerDetails(
  ticketSymbol: string,
  functionVal: string = "OVERVIEW"
) {
  const apiUrl = `https://www.alphavantage.co/query?function=${functionVal}&symbol=${ticketSymbol}&apikey=${apiKey}`;

  return new Promise((resolve, reject) => {
    // for mock data un comment the code
    // resolve(getTicketDetailsOfATickerData);
    // return;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data: { [key: string]: string }) => {
        console.log(data);
        console.log(apiUrl);
        if (data.Note || data.Information || !Object.keys(data).length) {
          reject("There is something wrong.");
        } else {
          resolve(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching ticket details:", error);
        reject("Something is wrong");
      });
  });
}

export default fetchTickerDetails;
