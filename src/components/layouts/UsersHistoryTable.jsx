import React, { useEffect, useState, useContext } from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const UsersHistoryTable = () => {
  const { user } = useContext(UserContext);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [totalPages, setTotalPages] = useState(1);

  const fetchConversations = async (pageNumber = 1) => {
    if (!user || user.role !== "admin") return;

    setLoading(true);
    setError("");

    try {
      const res = await axiosInstance.get(
        `${API_PATHS.CONVERSATIONS.GET_ALL_CONVERSATIONS}?page=${pageNumber}&limit=${limit}`,
        { withCredentials: true }
      );

      const data = res.data?.data?.conversations || [];
      setConversations(data);
      setTotalPages(Math.ceil(res.data?.data?.total / limit));
      setPage(pageNumber);
    } catch (err) {
      console.error("Fetch conversations failed:", err);
      setError("Failed to fetch conversations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations(1);
  }, [user]);

  if (!user) return <div>Please log in as admin to view conversations.</div>;
  if (loading) return <div>Loading conversations...</div>;
  if (error) return <div>{error}</div>;
  if (conversations.length === 0) return <div>No conversations found.</div>;

  return (
    <div className="w-full">
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse text-xs text-gray-900">
          <thead>
            <tr className="bg-primary text-white text-sm rounded-t-[8px]">
              <th className="p-3 text-left rounded-tl-[8px] font-medium">
                Conversation ID
              </th>
              <th className="p-3 text-left">
                <div className="flex items-center gap-1 font-medium">
                  <p>User</p>
                  <RiArrowDownSFill className="text-[18px]" />
                </div>
              </th>
              <th className="p-3 text-left font-medium">Start Time</th>
              <th className="p-3 text-left font-medium">Messages</th>
            </tr>
          </thead>

          <tbody>
            {conversations.map((conv) => (
              <tr
                key={conv._id}
                className="bg-white/40 border-b border-gray-300"
              >
                <td className="p-3">{conv._id}</td>
                <td className="p-3">
                  <div className="flex flex-col">
                    <p>{conv.userId?.username || "N/A"}</p>
                    <p className="text-gray-500">{conv.userId?.email || ""}</p>
                  </div>
                </td>
                <td className="p-3">
                  {new Date(conv.startedAt).toLocaleString()}
                </td>
                <td className="p-3">{conv.messageCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-2">
        <button
          onClick={() => fetchConversations(page - 1)}
          disabled={page === 1}
          className="text-gray-900 px-4 py-1 bg-background rounded-[8px] disabled:opacity-50 text-xs hover:text-white hover:bg-primary cursor-pointer"
        >
          Prev
        </button>

        <span className="text-xs text-gray-900">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => fetchConversations(page + 1)}
          disabled={page === totalPages}
          className="text-gray-900 px-4 py-1 bg-background rounded-[8px] disabled:opacity-50 text-xs hover:text-white hover:bg-primary cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UsersHistoryTable;
