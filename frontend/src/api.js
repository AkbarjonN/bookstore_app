const API_BASE = "https://bookstore-app-tzol.onrender.com";

export async function fetchBooks({ page, seed, region, likes, reviews }) {
    const url = `${API_BASE}/books?page=${page}&seed=${seed}&region=${region}&likes=${likes}&reviews=${reviews}`;
    const res = await fetch(url);
    return await res.json();
  }