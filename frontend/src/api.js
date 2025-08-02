const API_BASE = "http://localhost:5000";

export async function fetchBooks({ page, seed, region, likes, reviews }) {
    const url = `http://localhost:5000/books?page=${page}&seed=${seed}&region=${region}&likes=${likes}&reviews=${reviews}`;
    const res = await fetch(url);
    return await res.json();
  }