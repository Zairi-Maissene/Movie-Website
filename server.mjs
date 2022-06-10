import express from "express";
import { urlencoded } from "express";
import { json } from "express";
import mysql from "mysql";
import util  from "util";
import bcrypt from "bcrypt"
import session from "express-session";
import 'dotenv/config'

 
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
 database:"Movie Project"
});
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
const query = util.promisify(con.query).bind(con);
const app=express()
app.get('/api',(req,res)=>{
    res.json({name:'Maissene'})
}) 
app.use(urlencoded({extended:false}))
app.use(json())
app.use(session({
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:false,
}))
app.post('/signup',async (req,res)=>{
  const hashedPassword=await bcrypt.hash(req.body.password,10) 
  let hasAccount=false
    console.log(req.body)
    console.log(req.method)
    const result= await query('SELECT email FROM ACCOUNT')
    console.log(result)
hasAccount=result.find(elem=>elem.email===req.body.email)
console.log(hasAccount)  
    if(hasAccount!=null) {return res.json({error:'User already has an account'})
    } 
      if(hasAccount==null)
    {con.query(`INSERT INTO ACCOUNT (email,username,password) VALUES ("${req.body.email}","${req.body.username}","${hashedPassword}")`,(err,result)=>{
        if(err) throw err;  
        console.log(result); 
      return res.json({email:req.body.email})
    
      
    })
}})
app.post('/login',async (req,res)=>{
  console.log(req.body)
  const result=await query("SELECT* FROM ACCOUNT");
  console.log(result)
  const user=result.find(user=>user.Email===req.body.email)
  console.log(user)
  if(user==null)
    return 
    else {
      try{
       if(await bcrypt.compare(req.body.password,user.Password))
        { req.session.user=user.Email
            return res.json({user:user.Username})}
         else
         return res.json({error:"please verify password"})
      }
      catch{
        return res.status(500).send()
      }
     

    }
    
})
app.post('/watchlist',(req,res)=>{
  console.log(req.body)
  if(!req.session.user)
    return res.json({sessionError:"error"})
  con.query(`INSERT INTO WATCHLIST (user,movie,image,genres,rating) VALUES ("${req.session.user}","${req.body.title}","${req.body.image}","${req.body.genres.toString()}","${req.body.rating}")`,(err,result)=>{
   if(err) return res.json({message:"failure"})
   console.log(result)
   return res.json({message:"success"})
  })})
app.listen(8000,()=>{
    console.log('app listening on port 8000')
})
app.get('/watchlist',(req,res)=>{
  console.log(req.session.user)
  if(!req.session.user)
  return res.json({sessionError:true})
  con.query(`SELECT * FROM WATCHLIST WHERE USER="${req.session.user}"`,(err,result)=>{
    console.log(result)
    return res.json({result:result})
  })
})   



