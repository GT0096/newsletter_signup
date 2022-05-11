const express = require("express")
const bodyParser = require("body-parser");
const requests = require("request");
const https = require("https");

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
// const firstName = req.body.fName;
// const lastName = req.body.lName;
// const email = req.body.email;
const data = {
    members: [
        {
            email_address: req.body.email,
            status:  "subscribed",
            merge_fields: {
                FNAME: req.body.fName,
                LNAME: req.body.lName
            }
        }
    ]
};
// console.log(daTa);
// console.log(firstName, lastName, email);
const jsonData = JSON.stringify(data);

const url = "https://us14.api.mailchimp.com/3.0/lists/324c0da8ee";
const options = {
    method : "POST",
    auth: "gaurav1:31af394d5b47add446e9ae394fbf3e29-us14"
};

const request = https.request(url, options, function(response){

    if(response.statusCode==200) {
       
            res.sendFile(__dirname + "/success.html");
      
    } else {
        
            res.sendFile(__dirname + "/failure.html");
       
    }
    response.on("data", function(data){
    console.log(JSON.parse(data));
    })

})
request.write(jsonData);
request.end();
});

app.post("/failure", (req, res) => {
    res.redirect("/")
})

app.listen(process.env.PORT || 3000, function(){
    console.log("It is port by HeroKu");
});

// 31af394d5b47add446e9ae394fbf3e29-us14
// 324c0da8ee