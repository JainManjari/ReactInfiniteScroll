import { useCallback, useState, useRef } from "react";
import useBookSearch from "./useBookSearch";
function App() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const { isLoading, error, books, hasMore } = useBookSearch(query, pageNumber);

  const observer = useRef();

  const lastBookRef = useCallback(
    (node) => {
      if (isLoading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber(pageNumber+1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, hasMore]
  );

  const handleQueryChange = (e) => {
    let value = e.target.value;
    if (value.length > 0) {
      setQuery(value);
      setPageNumber(1);
    } else {
      setQuery("");
    }
  };

  const booksDisplayList = () => {
    return books.map((book, index) => {
      if (index + 1 === books.length) {
        return (
          <div ref={lastBookRef} key={book}>
            {book}
          </div>
        );
      } else {
        return <div key={book}>{book}</div>;
      }
    });
  };

  return (
    <div>
      <input type="text" value={query} onChange={handleQueryChange} />
      {isLoading && <div>Loading...</div>}
      {books.length > 0 && booksDisplayList()}
      {error && <div>Error</div>}
    </div>
  );
}

export default App;
