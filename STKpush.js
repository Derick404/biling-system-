const moment = require("moment");
require("dotenv").config();

// Generate timestamp (format: yyyyMMddHHmmss)
const timestamp = moment().format("YYYYMMDDHHmmss");

// Encode password: Shortcode + Passkey + Timestamp (Base64)
const password = Buffer.from(
  `${process.env.SHORTCODE}${process.env.PASSKEY}${timestamp}`
).toString("base64");

module.exports = {
   "BusinessShortCode": "174379",    
   "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMTYwMjE2MTY1NjI3",    
   "Timestamp":"20160216165627",    
   "TransactionType": "CustomerPayBillOnline",    
   "Amount": "1",    
   "PartyA":"254708374149",    
   "PartyB":"174379",    
   "PhoneNumber":"254708374149",    
   "CallBackURL": "https://mydomain.com/pat",    
   "AccountReference":"Test",    
   "TransactionDesc":"Test"
}
