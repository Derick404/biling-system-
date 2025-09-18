const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const { CONSUMER_KEY, CONSUMER_SECRET } = process.env;

// Function to get access token
async function getAccessToken() {
  const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");

  try {
    const response = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: { Authorization: `Basic ${auth}` }
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Error getting token:", error.response?.data || error.message);
    throw error;
  }
}

// Export the function so other files can use it
module.exports = getAccessToken;
