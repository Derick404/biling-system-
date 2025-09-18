const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const stkConfig = require("./stkconfig");//importfunction4stkconfigfile
const getAccessToken = require("./accesstoken");  //importfunction4accesstokenfile
const fs = require("fs");
const path = require("path");

dotenv.config();

const app = express();
app.use(express.json());

// stkpostRoute
app.post("/pay", async (req, res) => {
  const { phone, amount } = req.body; //requestbody(phone&amount)

  try {
    const token = await getAccessToken();

    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: stkConfig.BusinessShortCode,
        Password: stkConfig.Password,
        Timestamp: stkConfig.Timestamp,
        TransactionType: stkConfig.TransactionType,
        Amount: amount,
        PartyA: phone,
        PartyB: stkConfig.PartyB,
        PhoneNumber: phone,
        CallBackURL: stkConfig.CallBackURL,
        AccountReference: stkConfig.AccountReference,
        TransactionDesc: stkConfig.TransactionDesc
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("STK Push error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to process payment" });
  }
});

//callbackRoute
app.post("/callback", (req, res) => {
  console.log(" Callback received:", JSON.stringify(req.body, null, 2));
  
//transactions.json file path
 const transactionsFile = path.join(__dirname, "transactions.json");

let transactions = [];
  if (fs.existsSync(transactionsFile)) {
    const rawData = fs.readFileSync(transactionsFile);
    transactions = JSON.parse(rawData || "[]");
  }

  // Push new callback data
  transactions.push(req.body);

  // Save back to transactions.json
  fs.writeFileSync(transactionsFile, JSON.stringify(transactions, null, 2));

  // Send success response to Safaricom
  res.json({ message: "Callback received successfully" });
});
 

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
