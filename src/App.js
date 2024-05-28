import { useState } from "react";
import useBookSearch from "./useBookSearch";
function App() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const { isLoading, error, books, hasMore } = useBookSearch(query, pageNumber);

  console.log(isLoading, error, books, hasMore);

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
    return books.map((book) => {
      return <div key={book}>{book}</div>;
    });
  };

  return (
    <div>
      <input type="text" value={query} onChange={handleQueryChange} />
      {isLoading && <div>Loading...</div>}
      {books.length>0 && booksDisplayList()}
      {error && <div>Error</div>}
    </div>
  );
}

export default App;
