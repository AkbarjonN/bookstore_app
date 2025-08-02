import InfiniteScroll from "react-infinite-scroll-component";
import BookRow from "./BookRow";

export default function BookTable({ books, loadMore, hasMore }) {
  return (
    <div id="scrollableDiv" style={{ height: "70vh", overflow: "auto" }}>
      <InfiniteScroll
        dataLength={books.length}
        next={() => loadMore(false)}
        hasMore={hasMore}
        loader={<p className="text-center my-2">Loading...</p>}
        scrollableTarget="scrollableDiv"
      >
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>ISBN</th>
              <th>Title</th>
              <th>Authors</th>
              <th>Publisher</th>
              <th>Likes</th>
              <th>Reviews</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <BookRow key={book.index} book={book} />
            ))}
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
  );
}