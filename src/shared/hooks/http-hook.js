import { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import request from "../../api/axios";
import { AuthContext } from "../contexts/auth-context";

export const useHttpClient = () => {
  const auth = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const [source] = useState(axios.CancelToken.source());

  const makeRequest = useCallback(
    async (url, method = "get", data = null, headers = {}, params = {}) => {
      setLoading(true);
      try {
        const response = await request({
          url,
          method,
          data,
          headers: {
            Authorization: `Bearer ${auth.token}`,
            ...headers
          },
          params,
          cancelToken: source.token
        });
        setLoading(false);
        return response;
      } catch (e) {
        if (axios.isCancel(e)) {
          console.log(e);
        } else {
          setError(e.message);
          setLoading(false);
        }
        throw e;
      }
    },
    [source, auth]
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      source.cancel("Request Canceled");
    };
  }, [source]);

  return {
    loading,
    error,
    clearError,
    makeRequest
  };
};
