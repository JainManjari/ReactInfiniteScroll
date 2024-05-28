import { useState } from "react";
import useBookSearch from "./useBookSearch";
function App() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  useBookSearch(query, pageNumber);
  return (
    <div>
      <input type="text" />

      <div>Loading...</div>
      <div>Error</div>
    </div>
  );
}

export default App;
