import InfiniteScroll from "react-infinite-scroll-component";

export default function BookGallery({ books, loadMore, hasMore }) {
  return (
    <div id="scrollableGallery" style={{ height: "70vh", overflow: "auto" }}>
      <InfiniteScroll
        dataLength={books.length}
        next={() => loadMore(false)}
        hasMore={hasMore}
        loader={<p className="text-center my-2">Loading...</p>}
        scrollableTarget="scrollableGallery"
      >
        <div className="row">
          {books.map((book) => (
            <div key={book.index} className="col-md-3 mb-4">
              <div className="card h-100">
                <img
                  src={`https://picsum.photos/seed/${book.isbn}/200/300`}
                  className="card-img-top"
                  alt="cover"
                />
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">
                    <strong>Authors:</strong> {book.authors.join(", ")}
                  </p>
                  <p className="card-text">
                    <small className="text-muted">{book.publisher}</small>
                  </p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">
                    Likes: {book.likes} | Reviews: {book.reviews.length}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}