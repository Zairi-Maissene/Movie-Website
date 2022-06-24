import express from "express";
import { urlencoded } from "express";
import { json } from "express";
import mysql from "mysql";
import util from "util";
import bcrypt from "bcrypt";
import session from "express-session";
import path,{dirname} from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

var con = mysql.createConnection({
  host: "localhost", 
  user: "root",
  database: "Movie Project",
});
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
const query = util.promisify(con.query).bind(con);
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.resolve(__dirname, '../myapp/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../myapp/build', 'index.html'));
});
app.get("/api", (req, res) => {
  res.json({ name: "Maissene" });
});
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.post("/signup", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  let hasAccount = false;
  console.log(req.body);
  console.log(req.method);
  const result = await query("SELECT email FROM ACCOUNT");
  console.log(result);
  hasAccount = result.find((elem) => elem.email === req.body.email);
  console.log(hasAccount);
  if (hasAccount != null) {
    return res.json({ error: "User already has an account" });
  }
  if (hasAccount == null) {
    con.query(
      `INSERT INTO ACCOUNT (email,username,password) VALUES ("${req.body.email}","${req.body.username}","${hashedPassword}")`,
      (err, result) => {
        if (err) throw err;
        console.log(result);
        return res.json({ email: req.body.email });
      }
    );
  }
});
app.get("/login", (req, res) => {
  console.log("getlogin");
  if (req.session.username) return res.json({ user: req.session.username });
});
app.post("/login", async (req, res) => {
  console.log(req.body);
  const result = await query("SELECT* FROM ACCOUNT");
  console.log(result);
  const user = result.find((user) => user.Email === req.body.email);
  console.log(user);
  if (user == null) return res.json({ error: "user not found" });
  else {
    try {
      if (await bcrypt.compare(req.body.password, user.Password)) {
        req.session.user = user.Email;
        req.session.username = user.Username;
        return res.json({ user: user.Username });
      } else return res.json({ error: "please verify password" });
    } catch {
      return res.status(500).send();
    }
  }
});
app.post("/watchlist", (req, res) => {
  console.log(req.body);
  if (!req.session.user)
    return res.json({ sessionError: "true", message: "error" });
  con.query(
    `INSERT INTO WATCHLIST (user,movie,image) VALUES ("${req.session.user}","${req.body.title}","${req.body.image}")`,
    (err, result) => {
      if (err?.code === "ER_DUP_ENTRY") return res.json({ message: "info" });
      console.log(result);
      return res.json({ message: "success" });
    }
  );
});
app.post("/favorites", (req, res) => {
  console.log(req.body);
  if (!req.session.user)
    return res.json({ sessionError: "error", message: "error" });
  con.query(
    `INSERT INTO favorites (user,movie,image) VALUES ("${req.session.user}","${req.body.title}","${req.body.image}")`,
    (err, result) => {
      if (err?.code === "ER_DUP_ENTRY") return res.json({ message: "info" });
      console.log(result);
      return res.json({ message: "success" });
    }
  );
});
app.listen(8000, () => {
  console.log("app listening on port 8000");
});
app.get("/watchlist", (req, res) => {
  console.log(req.session.user);
  if (!req.session.user) return res.json({ sessionError: true });
  con.query(
    `SELECT * FROM WATCHLIST WHERE USER="${req.session.user}"`,
    (err, result) => {
      console.log(result);
      return res.json({ result: result });
    }
  );
});
app.get("/favorites", (req, res) => {
  console.log(req.session.user);
  if (!req.session.user) return res.json({ sessionError: true });
  con.query(
    `SELECT * FROM favorites WHERE USER="${req.session.user}"`,
    (err, result) => {
      console.log(result);
      return res.json({ result: result });
    }
  );
});
app.get("/logout", (req, res) => {
  req.session.user = null;
  req.session.username = null;
  console.log("logout");
  return res.end();
});
app.get("/delete/:list/:movie", (req, res) => {
  con.query(
    `DELETE FROM ${req.params.list} WHERE movie="${req.params.movie}" and user="${req.session.user}"`,
    (err, result) => {
      if (err) throw err;
      console.log(result);
    }
  );
  return res.end();
});
