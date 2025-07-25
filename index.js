import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;
//create object to store posts
const posts = [];
var postId = 0;

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  // Render the index page with posts
  res.render("index.ejs", { posts: posts });
});

app.get("/create-post", (req, res) => {
  res.render("create-post.ejs");
});
app.post("/create-post", (req, res) => {
  const { title, content , link} = req.body;
  // Here you would typically save the post to a database
  //add id to the post
  if (!title || !content) {
    console.log("Title or content is missing");
    return res.status(400).send("Title and content are required");
  }
  postId = posts.length + 1;
  posts.push({ id: postId, title, content ,link});
  console.log("Post saved:", posts);

  console.log("New Post Created:", { title, content , link});
  res.redirect("/");
});

//delete post 
app.get("/delete-post/:index", (req, res) => {
  const index = req.params.index -1;
  console.log("Attempting to delete post at index:", index);
  console.log("Current posts:", posts.length);
  if (index >= 0 && index < posts.length) {
    posts.splice(index, 1);
    console.log("Post deleted:", posts);
    res.redirect("/");
  } else {
    res.status(404).send("Post not found");
  }
});

//edit post
app.get("/edit-post/:index", (req, res) => {
  const index = req.params.index - 1;
  if (index >= 0 && index < posts.length) {
    const post = posts[index];
    res.render("edit-post.ejs", { post: post, index: index });
  } else {
    res.status(404).send("Post not found");
  }
});

app.post("/edit-post/:index", (req, res) => {
  const index = req.params.index - 1;
  const { title, content } = req.body;
  if (index >= 0 && index < posts.length) {
    if (!title || !content) {
      console.log("Title or content is missing");
      return res.status(400).send("Title and content are required");
    }
    posts[index] = { id: index , title, content };
    console.log("Post updated:", posts);
    res.redirect("/");
  } else {
    res.status(404).send("Post not found");
  }
});
//about page
app.get("/about", (req, res) => {
  res.render("about.ejs");
});
//contact page
app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    console.log("Name, email, or message is missing");
    return res.status(400).send("All fields are required");
  }
  console.log("Contact form submitted:", { name, email, message });
  //thanks to contact
  res.render("contact-success.ejs", { name: name });
});
app.get("/contact-success", (req, res) => {
  res.render("contact-success.ejs");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
