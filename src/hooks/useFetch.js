// src/hooks/useFetch.js
import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // memory leak avoid করার জন্য
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(url);
        if (isMounted) setData(res.data);
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false; // cleanup
    };
  }, [url]);

  return { data, loading, error };
};
