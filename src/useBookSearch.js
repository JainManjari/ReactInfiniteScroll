import React, {useEffect, useState} from "react";
import axios from "axios";


const useBookSearch = (query, pageNumber) => {

    const retrieveBooks = async () => {
        try {
            let response = await axios.get(`https://openlibrary.org/search.json?q=${query}&p=${pageNumber}`)
            console.log(response);
            return response;
        } catch(err) {
            console.log("error in fetching books");
        }
    }
    useEffect(()=>{
        let response = retrieveBooks();

    }, [query, pageNumber]);

    return null;

}

export default useBookSearch;