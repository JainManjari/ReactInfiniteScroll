import React, { useEffect, useState } from "react";
import axios from "axios";

const useBookSearch = (query, pageNumber) => {
  useEffect(() => {
    if (query.length <= 0) {
      return;
    }
    let cancel;
    axios({
      url: `https://openlibrary.org/search.json?q=${query}&p=${pageNumber}`,
      method: "get",
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        if(axios.isCancel(err)) {
            return;
        }
        console.log("error in fetching books ", err);
      });
    return () => cancel();
  }, [query, pageNumber]);

  return null;
};

export default useBookSearch;
