import { useState, useEffect, useCallback } from "react";

export const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const getUsers = useCallback(async () => {
    const response = await fetch(url);
    const data = await response.json();
    setUsers(data);
    setLoading(false);
  }, [url]);

  useEffect(() => {
    getUsers();
  }, [url, getUsers]);
  return { loading, users };
};
