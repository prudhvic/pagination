import React from "react";
import { useState, useEffect } from "react";

const useFetch = (url) => {
  console.log(url);
  let [data, setData] = useState(null);
  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState(null);
  useEffect(() => {
    setIsLoading(true);

    let fetchData = async () => {
      try {
        let res = await fetch(url);
        console.log(res);
        if (res.status === "404") {
          throw new Error("page not found");
        }

        let json = await res.json();

        setData(json);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setError("page not found");
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);
  return {
    data,
    isLoading,
    error,
  };
};

export default useFetch;
