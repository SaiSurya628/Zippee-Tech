const express = require('express');
const sqlite3 = require('sqlite3');
const {open}=require("sqlite");
const path=require("path");
const cors = require('cors');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt =require("bcrypt");
const dbPath=path.join(__dirname,"database.db");
const cron = require('node-cron');
const app = express();

app.use(cors());
app.use(express.json());


let db = null;


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'saipeddireddy24@gmail.com',
    pass: '9490983273'
  }
});

async function sendMailToUsers() {
  // Get all the users from the database
  const users = await db.all('SELECT * FROM users');

  // Loop through all the users and send them the email
  for (const user of users) {
    const mailOptions = {
      from: 'saipeddireddy24@gmail.com',
      to: user.email,
      subject: 'Good Morning',
      text: 'This is a test email from Nodemailer.'
    };
 
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
       
      } else {
        console.log(`Email sent to ${user.username} (${user.email}): ${info.response}`);
        
      }
    });
  }
}

const initialization=async()=>{
    try{
db=await open({filename:dbPath,driver:sqlite3.Database})
app.listen(5000,()=>{
    console.log("server running")
   
});
await db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE, PASSWORD TEXT NOT NULL, email TEXT NOT NULL)');
  
   // Schedule the mail sending cron job
   cron.schedule('0  8 * * *', function() {
      sendMailToUsers();
    });

}
    catch(error){
        process.exit(1)
        console.log(`db error ${error}`);
    }
}

initialization();

app.post("/signup", async (request,response)=>{
    
    const {username,password,email}=request.body;
    const User=`select * from users where username="${username}"`
    const checkingUser =  await db.get(User);

    if(checkingUser!==undefined){
        console.log(checkingUser.username);
        response.send("user already exists")
    }

    else if(username===""|| password==="" || email===""){
      response.send("please enter full details");
    }
    else{
        const bcryptPassword= await bcrypt.hash(request.body.password, 10);
        const createAccount=`INSERT INTO users (username, password, email) VALUES ("${username}","${bcryptPassword}","${email}")`;
        const adding=await db.run(createAccount);
        response.send("created successully");
    }
    
})



app.post("/login", async (request, response) => {
        const { username, password ,email} = request.body;
        const selectUserQuery = `SELECT * FROM users WHERE username = '${username}'`;
        const dbUser = await db.get(selectUserQuery);
        if (dbUser === undefined) {
          response.status(400);
          response.send("Invalid User");
        } else {
            console.log(dbUser)
          const isPasswordMatched = await bcrypt.compare(password, dbUser.PASSWORD);
          if (isPasswordMatched === true && email===dbUser.email) {
            const payload = {
              username: username,
            };
            const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");
            response.send({ jwtToken });
          } else {
            response.status(400);
            response.send("Invalid Password");
          }
        }
      });

  







    


 

module.exports=app