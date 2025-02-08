import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import * as api from "../services/api";

export default function useBlockchain() {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBlocks = async () => {
    try {
      const response = await api.getBlocks();
      setBlocks(response.data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to fetch blocks");
    }
  };

  const mineNewBlock = async (transaction) => {
    setLoading(true);
    try {
      await api.mineBlock([transaction]);
      await fetchBlocks();
      toast.success("New block mined successfully!");
    } catch (err) {
      setError(err.message);
      toast.error("Failed to mine block");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlocks();
  }, []);

  return {
    blocks,
    loading,
    error,
    mineNewBlock,
    refreshBlocks: fetchBlocks,
  };
}
