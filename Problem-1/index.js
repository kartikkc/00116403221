require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");


const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
var access_token;
app.get("/numbers/e", async (req, res) => {
    try {
        var extractAuth = await axios.post("http://20.244.56.144/test/auth", {
            "companyName": "indiaMart",
            "clientID": process.env.clientID,
            "clientSecret": process.env.clientSecret,
            "ownerName": "Kartik",
            "ownerEmail": process.env.ownerEmail,
            "rollNo": "00116403221"
        }
        );
        access_token = extractAuth.data.access_token;
        console.log(access_token);
        res.redirect("/answer");
    }
    catch (error) {
        console.log(error.response);
        res.status(500).json({ error: "Authentication Failed" });
    }
})

app.get("/answer", async (req, res) => {
    if (!access_token) {
        return res.status(400).json({ Error: "Access token is not available" });
    }
    try {
        var response = await axios.get("http://20.244.56.144/test/even", {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });
        // console.log("\n" + access_token + "\n");
        res.json(response.data);
        console.log(response.data);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: response.data });
    }
})




app.listen(PORT, () => {
    console.log("[Status] The Server Started Sucessfully.")
})

