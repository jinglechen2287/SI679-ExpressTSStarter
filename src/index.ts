import express from "express";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.urlencoded());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Hello World 3!");
});

app.get("/hello", (_, res) => {
  res.send("Hello Postman");
});

app.get("/about", (_, res) => {
  res.send("Welcome to the About page!");
});

app.get("/contact", (_, res) => {
  res.send(
    `
    <html><body>
      <form action="/submit" method="post">
        <label for="fname">First name:</label><br>
        <input type="text" id="fname" name="fname" placeholder="John"><br>
        <label for="lname">Last name:</label><br>
        <input type="text" id="lname" name="lname" placeholder="Doe"><br><br>
        <input type="submit" value="Submit">
      </form>
    </html></body>
    `
  );
});

app.get("/people", (req, res) => {
  const { letter } = req.query;
  if (!letter && typeof letter !== "string") {
    res.status(400).send("invalid query");
  } else {
    const people = [
      "Alice",
      "Bob",
      "Charlie",
      "Daniela",
      "Ella",
      "Fred",
      "Gaurav",
    ];
    const result = people.find(
      (p) => p[0].toLowerCase() === (letter as string)[0].toLowerCase()
    );
    res.send(result ? result : `No person found for ${letter}`);
  }
});

app.get("/person/:id", (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    res.status(400).send("BAD REQUEST: Person ID must be a number");
  }
  res.send(`You asked for person ${id}`);
});

app.get("/catalog", (req, res) => {
  const { itemid } = req.query;

  if (isNaN(Number(itemid))) {
    res.status(400).send("Error: itemid must be a number");
  }
  res.send(`Oh, you're looking for item ${itemid}`);
});

app.post("/submit", (req, res) => {
  
  const { fname, lname } = req.body;
  res.send(`Thanks for submitting your data, ${fname} ${lname}!`);
});

app.post("/postData", async (req, res) => {
    console.log("server log");
  const { firstName, lastName } = req.body;
  console.log(firstName, lastName)
  res.send(`Hello ${firstName} ${lastName}!`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use((_, res) => {
  res.status(404).send("404 - Page Not Found");
});
