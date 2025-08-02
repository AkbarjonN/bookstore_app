import express from "express";
import cors from "cors";
import { generateBooks } from "./fakerGenerator.js";

const app = express();
app.use(cors());

app.get("/books", (req, res) => {
  const { seed, page, region, likes, reviews } = req.query;

  const books = generateBooks({
    seed,
    page: parseInt(page),
    region,
    likes: parseFloat(likes),
    reviews: parseFloat(reviews),
  });

  res.json(books);
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});