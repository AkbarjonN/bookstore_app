import { useState } from "react";

export default function BookRow({ book }) {
  const [expanded, setExpanded] = useState(false);

  const toggle = () => setExpanded((prev) => !prev);

  return (
    <>
      <tr
        style={{ cursor: "pointer" }}
        onClick={toggle}
      >
        <td>{book.index}</td>
        <td>{book.isbn}</td>
        <td>{book.title}</td>
        <td>{book.authors.join(", ")}</td>
        <td>{book.publisher}</td>
        <td>{book.likes}</td>
        <td>{book.reviews.length}</td>
      </tr>

      {expanded && (
        <tr>
          <td colSpan="7">
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-3">
                  <img
                    src={`https://picsum.photos/seed/${book.isbn}/200/300 `}
                    className="img-fluid rounded-start"
                    alt="cover"
                  />
                </div>
                <div className="col-md-9">
                  <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text">
                      <strong>Authors:</strong> {book.authors.join(", ")}
                    </p>
                    <p className="card-text">
                      <strong>Publisher:</strong> {book.publisher}
                    </p>
                    {book.reviews.length > 0 ? (
                      <div>
                        <strong>Reviews:</strong>
                        <ul className="list-group list-group-flush mt-2">
                          {book.reviews.map((rev, i) => (
                            <li key={i} className="list-group-item">
                              <strong>{rev.reviewer}: </strong>
                              {rev.text}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-muted mt-2">No reviews</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}