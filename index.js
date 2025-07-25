import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;
//create object to store posts
const posts = [];

app.use(bodyParser.urlencoded({ extended: true }));

// app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  // Render the index page with posts
  res.render("index.ejs", { posts: posts });
  
});
app.get("/create-post", (req, res) => {
  res.render("create-post.ejs");
});
app.post("/create-post", (req, res) => {
  const { title, content } = req.body;
  // Here you would typically save the post to a database
  posts.push({ title, content });
console.log("Post saved:",posts);

  console.log("New Post Created:", { title, content });
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
