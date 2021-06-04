

const express = require("express");

const request = require("request");

const bodyParser = require("body-parser");

  const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req,res){
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.emailAdress;
  // console.log(firstName, lastName, email);

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us6.api.mailchimp.com/3.0/lists/02c4532c21";

  const options = {
    method: "POST",
    auth: "Divyanth1:eb6baa65fa0ec341dbff4c3e4767b6f1-us6"
  }

  const request =  https.request(url, options, function(response){

    if(response.statusCode === 200)
    {
      res.sendFile(__dirname + "/success.html");
    }
    else
    {
      res.sendFile(__dirname +"/failure.html");
    }

    response.on("data", function(data){
      //console.log(response.statusCode);
    })
  })
   request.write(jsonData);
   request.end();
});

app.post("/failure", function(req, res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is up and running");
})

//List ID
// 02c4532c21

//API Key
// eb6baa65fa0ec341dbff4c3e4767b6f1-us6
