import React, { useEffect, useState } from "react";
import axios from "axios";

const useBookSearch = (query, pageNumber) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(()=>{
    setBooks([]);
  }, [query])

  useEffect(() => {
    if (query.length <= 0) {
      setIsLoading(false);
      setError(null);
      setHasMore(false);
      setBooks([]);
      return;
    }
    setIsLoading(true);
    setError(null);
    let cancel;
    axios({
      url: `https://openlibrary.org/search.json?q=${query}&p=${pageNumber}`,
      method: "get",
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((response) => {
        setIsLoading(false);
        // converting set back to array by using ...
        setBooks(([...books, ...response.data.docs.map((item)=>item.title)]));
        setHasMore(response.data.docs.length > 0);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          return;
        }
        console.log("error in fetching books ", err);
        setError(err);
        setIsLoading(false);
      });
    return () => cancel();
  }, [query, pageNumber]);

  return { isLoading, error, books, hasMore };
};

export default useBookSearch;
