import React, { useEffect, useRef, useState } from "react";

import Card from "../UI/Card";
import "./Search.css";
import LoadingIndicator from '../UI/LoadingIndicator'


const Search = (props) => {
  const { onLoadHandler } = props;
  const [enteredValue, setenteredValue] = useState("");
  const inputRef = useRef();
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredValue === inputRef.current.value) {
        const query =
          enteredValue === ""
            ? ""
            : `?orderBy="title"&equalTo="${enteredValue}"`;
        console.log("use effect");
        setIsLoading(true)
        fetch(
          "https://simple-1db1e-default-rtdb.firebaseio.com/ings.json" + query
        )
          .then((response) => response.json())
          .then((responseData) => {
            setIsLoading(false)

            onLoadHandler(responseData);
          });
      }
    }, 500);
    return ()=>{
      clearTimeout(timer)
    }
  }, [onLoadHandler, enteredValue, inputRef]);

  return (
    <section className="search">
     {isLoading && <div style={{textAlign:'center'}}> <LoadingIndicator /> </div>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={inputRef}
            type="text"
            value={enteredValue}
            onChange={(e) => setenteredValue(e.target.value)}
          />
        </div>
      </Card>
    </section>
  );
};

export default Search;
