import { useState } from "react";
import useBookSearch from "./useBookSearch";
function App() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  useBookSearch(query, pageNumber);

  const handleQueryChange = (e) => {
    let value = e.target.value;
    if (value.length > 0) {
      setQuery(value);
      setPageNumber(1);
    } else {
      setQuery("");
    }
  };

  return (
    <div>
      <input type="text" value={query} onChange={handleQueryChange} />

      <div>Loading...</div>
      <div>Error</div>
    </div>
  );
}

export default App;
