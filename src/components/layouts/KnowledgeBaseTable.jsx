import React, { useEffect, useState, useContext } from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

const KnowledgeBaseTable = () => {
  const { user } = useContext(UserContext);
  const [knowledge, setKnowledge] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchKnowledge = async (pageNum = 1) => {
    if (!user) return;

    setLoading(true);
    setError("");

    try {
      const res = await axiosInstance.get(
        `${API_PATHS.KNOWLEDGE_BASE.GET_KNOWLEDGE}?page=${pageNum}&limit=7`,
        { withCredentials: true }
      );

      setKnowledge(res.data?.data || []);
      setPage(res.data?.page || 1);
      setTotalPages(res.data?.totalPages || 1);
    } catch (err) {
      console.error("Fetch knowledge failed:", err);
      setError("Failed to fetch knowledge.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKnowledge(page);
  }, [user, page]);

  const togglePublic = async (id, currentStatus) => {
    try {
      await axiosInstance.put(API_PATHS.KNOWLEDGE_BASE.UPDATE_KNOWLEDGE(id), {
        isPublic: !currentStatus,
      });

      setKnowledge((prev) =>
        prev.map((k) => (k._id === id ? { ...k, isPublic: !currentStatus } : k))
      );
    } catch (err) {
      console.error("Toggle public failed:", err);
    }
  };

  const toggleApproved = async (id, currentStatus) => {
    try {
      await axiosInstance.put(API_PATHS.KNOWLEDGE_BASE.UPDATE_KNOWLEDGE(id), {
        isApproved: !currentStatus,
      });

      setKnowledge((prev) =>
        prev.map((k) =>
          k._id === id ? { ...k, isApproved: !currentStatus } : k
        )
      );
    } catch (err) {
      console.error("Toggle approved failed:", err);
    }
  };

  if (!user) return <div>Please log in to view knowledge base.</div>;
  if (loading) return <div>Loading knowledge...</div>;
  if (error) return <div>{error}</div>;
  if (knowledge.length === 0) return <div>No knowledge found.</div>;

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse text-xs text-gray-900">
        <thead>
          <tr className="bg-primary text-white text-sm rounded-t-[8px]">
            <th className="p-3 text-left rounded-tl-[8px] font-medium">
              Title
            </th>
            <th className="p-3 text-left font-medium">Content</th>
            <th className="p-3 text-left font-medium">Created At</th>
            <th className="p-3 text-left font-medium">Access</th>
            <th className="p-3 text-left rounded-tr-[8px] font-medium">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {knowledge.map((k) => (
            <tr key={k._id} className="bg-white/40 border-b border-gray-300">
              <td className="p-3">{k.title}</td>
              <td className="p-3 truncate max-w-xs">{k.content}</td>
              <td className="p-3">{new Date(k.createdAt).toLocaleString()}</td>
              <td className="p-3">
                <button
                  onClick={() => togglePublic(k._id, k.isPublic)}
                  className={`py-[2.5px] px-4 rounded-[50px] text-white text-[10px] ${
                    k.isPublic ? "bg-green-500" : "bg-gray-400"
                  }`}
                >
                  {k.isPublic ? "Public" : "Private"}
                </button>
              </td>
              <td className="p-3">
                <button
                  onClick={() => toggleApproved(k._id, k.isApproved)}
                  className={`py-[2.5px] px-4 rounded-[50px] text-white text-[10px] ${
                    k.isApproved ? "bg-pink-500" : "bg-gray-400"
                  }`}
                >
                  {k.isApproved ? "Approved" : "Not Approved"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4 text-sm">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-1 bg-gray-200 rounded-[8px] disabled:opacity-50 text-gray-900 hover:text-white hover:bg-primary text-xs cursor-pointer"
        >
          Prev
        </button>
        <span className="text-xs text-gray-900">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-4 py-1 bg-gray-200 rounded-[8px] disabled:opacity-50 text-gray-900 hover:text-white hover:bg-primary text-xs cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default KnowledgeBaseTable;
