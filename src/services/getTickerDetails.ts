const apiKey = process.env.ALPHA_ADVANTAGE_KEY;

function fetchTicketDetails(ticketSymbol: string) {
  const apiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticketSymbol}&apikey=${apiKey}`;

  return new Promise((resolve) => {
    fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Process the response data as needed
      console.log(data);
    })
    .catch((error) => {
      console.error("Error fetching ticket details:", error);
    });
  })
}

export default fetchTicketDetails;
