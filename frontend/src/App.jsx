import { useState, useEffect } from "react";
import Controls from "./components/Controls";
import BookTable from "./components/BookTable";
import { fetchBooks } from "./api";
import Papa from "papaparse";
import BookGallery from "./components/BookGallery";
export default function App() {
  const [region, setRegion] = useState("us");
  const [seed, setSeed] = useState("42");
  const [likes, setLikes] = useState(3.7);
  const [reviews, setReviews] = useState(4.7);

  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [viewMode, setViewMode] = useState("table");
  useEffect(() => {
    loadBooks(true);
  }, [region, seed, likes, reviews]);

  async function loadBooks(reset = false) {
    const currentPage = reset ? 1 : page;
    const newBooks = await fetchBooks({
      page: currentPage,
      seed,
      region,
      likes,
      reviews,
    });

    if (reset) {
      setBooks(newBooks);
      setPage(2);
      setHasMore(true);
    } else {
      setBooks((prev) => [...prev, ...newBooks]);
      setPage(currentPage + 1);
      if (newBooks.length === 0) setHasMore(false);
    }
  }

  function handleRandomSeed() {
    const random = Math.floor(Math.random() * 1000000);
    setSeed(random.toString());
  }
  function exportToCSV() {
    if (books.length === 0) return;
  
    const data = books.map((b) => ({
      Index: b.index,
      ISBN: b.isbn,
      Title: b.title,
      Authors: b.authors.join(","),
      Publisher: b.publisher,
      Likes: b.likes,
      Reviews: b.reviews.length,
    }));
  
    const csv = Papa.unparse(data, {delimiter: ";"});
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `books_seed${seed}.csv`);
    link.click();
  }
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Bookstore App</h1>
      <Controls
        region={region}
        setRegion={setRegion}
        seed={seed}
        setSeed={setSeed}
        onRandomSeed={handleRandomSeed}
        likes={likes}
        setLikes={setLikes}
        reviews={reviews}
        setReviews={setReviews}
      />
      <div className="mb-3">
        <button
        className={`btn me-2 ${viewMode === "table" ? "btn-primary" : "btn-outline-primary"}`}
        onClick={() => setViewMode("table")}
        >
          Table View
        </button>
        <button
        className={`btn ${viewMode === "gallery" ? "btn-primary" : "btn-outline-primary"}`}
        onClick={() => setViewMode("gallery")}
        >
          Gallery View
        </button>
      </div>
      <div className="mb-3">
        <button className="btn btn-success" onClick={exportToCSV}>
          Export to CSV
        </button>
      </div>
      {viewMode === "table" ? (
        <BookTable
        books={books}
        loadMore={loadBooks}
        hasMore={hasMore}
        />
      ) : (
        <BookGallery
        books={books}
        loadMore={loadBooks}
        hasMore={hasMore}
        />
      )}
      
    </div>
    
  );
}