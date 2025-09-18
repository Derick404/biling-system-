const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const { CONSUMER_KEY, CONSUMER_SECRET } = process.env;
//takes the consumer key and secret from the .env file and encodes them in base64
async function getAccessToken() {
  const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");

  try {
    const response = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Access Token:", response.data.access_token);
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
}

getAccessToken();
