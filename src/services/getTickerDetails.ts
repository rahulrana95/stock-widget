import getTicketDetailsOfATickerData from "../fixtures/getTicketDetailsOfATicker.json";
import dummyResponse from "../fixtures/data.json";

const apiKey = process.env.REACT_APP_ALPHA_ADVANTAGE_KEY;

// @ts-ignore
const parseData = (data) => {
  const timestamps = data.chart.result[0].timestamp;
  const prices = data.chart.result[0].indicators.quote[0].close;

  const chartData = {
    // @ts-ignore
    labels: timestamps.map((ts) => new Date(ts).getMinutes()),
    datasets: [
      {
        label: "Stock Price",
        data: prices,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        cubicInterpolationMode: "monotone", // Apply cubic interpolation
        pointRadius: 0, // Disable point markers
        pointHoverRadius: 20, // Disable point markers on hover
      },
    ],
  };

  return chartData;
};

function fetchTickerDetails(
  ticketSymbol: string,
  functionVal: string = "OVERVIEW"
) {
  const apiUrl = `https://www.alphavantage.co/query?function=${functionVal}&symbol=${ticketSymbol}&apikey=${apiKey}`;

  return new Promise((resolve, reject) => {
    // for mock data un comment the code
    resolve({
      data: getTicketDetailsOfATickerData,
      chartData: parseData(dummyResponse),
    });
    return;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data: { [key: string]: string }) => {
        const chartData = parseData(dummyResponse);
        if (
          data.Note ||
          data.Information ||
          !Object.keys(data).length ||
          data["Error Message"]
        ) {
          reject("There is something wrong.");
        } else {
          resolve({ data, chartData });
        }
      })
      .catch((error) => {
        console.error("Error fetching ticket details:", error);
        reject("Something is wrong");
      });
  });
}

export default fetchTickerDetails;
