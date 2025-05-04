"use client";
import Header from "@/components/Header";
import { useState, useEffect } from "react";

const ChatPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch current user ID and users list
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setCurrentUserId(userId);
      fetchUsers(userId);
    }
  }, []);

  // Fetch messages for selected user
  useEffect(() => {
    if (selectedUser && currentUserId) {
      fetchMessages(currentUserId, selectedUser.id);
      const interval = setInterval(() => {
        fetchMessages(currentUserId, selectedUser.id);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [selectedUser, currentUserId]);

  const fetchUsers = async (currentUserId) => {
    try {
      const response = await fetch("http://localhost/JunctionX/api/chat.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "get_users",
          current_user_id: currentUserId,
        }),
      });
      const data = await response.json();
      if (data.success) setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchMessages = async (user1Id, user2Id) => {
    try {
      const response = await fetch("http://localhost/JunctionX/api/chat.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "get",
          user1_id: user1Id,
          user2_id: user2Id,
        }),
      });
      const data = await response.json();
      if (data.success) setMessages(data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedUser || !currentUserId) return;
    setLoading(true);
    try {
      const response = await fetch("http://localhost/JunctionX/api/chat.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "send",
          sender_id: currentUserId,
          receiver_id: selectedUser.id,
          message: newMessage,
        }),
      });
      const data = await response.json();
      if (data.success && data.newMessage) {
        setMessages((prev) => [...prev, data.newMessage]);
        setNewMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="shadow-three mx-auto max-w-[1000px] rounded-lg bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-8 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Chat
                </h3>
                <div className="flex h-[400px] rounded-lg border border-gray-200 dark:border-gray-700">
                  {/* Users List */}
                  <div className="w-1/4 border-r border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
                    <div className="p-4">
                      <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">Users</h4>
                      <div className="space-y-2">
                        {users.map((user) => (
                          <div
                            key={user.id}
                            className={`cursor-pointer rounded-lg p-3 transition-colors ${
                              selectedUser?.id === user.id
                                ? "bg-primary text-white"
                                : "hover:bg-gray-100 dark:hover:bg-gray-700"
                            }`}
                            onClick={() => setSelectedUser(user)}
                          >
                            <div className="flex items-center">
                              <div className="mr-3 h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                              <span className="font-medium">{user.full_name}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Chat Area */}
                  <div className="flex w-3/4 flex-col">
                    {selectedUser ? (
                      <>
                        <div className="flex items-center border-b border-gray-200 p-4 dark:border-gray-700">
                          <div className="mr-3 h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                          <div>
                            <h4 className="font-semibold text-gray-800 dark:text-white">{selectedUser.full_name}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Online</p>
                          </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 flex flex-col">
                          {messages.map((message) => {
                            const isCurrentUser = String(message.sender_id) === String(currentUserId);
                            return (
                              <div
                                key={message.id}
                                className={`mb-2 flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                              >
                                <div
                                  className={`max-w-[70%] rounded-lg p-3 ${
                                    isCurrentUser
                                      ? "bg-blue-500 text-white"
                                      : "bg-gray-100 text-gray-900"
                                  }`}
                                >
                                  <p className="text-sm">{message.message_text}</p>
                                  <p className="mt-1 text-xs opacity-70 text-right">
                                    {message.sent_at && !isNaN(new Date(message.sent_at).getTime())
                                      ? new Date(message.sent_at).toLocaleTimeString([], {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                        })
                                      : ""}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                          <div className="flex">
                            <input
                              type="text"
                              value={newMessage}
                              onChange={(e) => setNewMessage(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && !loading) sendMessage();
                              }}
                              placeholder="Type a message..."
                              className="flex-1 rounded-l-lg border border-gray-300 p-2 focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                            <button
                              type="button"
                              onClick={sendMessage}
                              disabled={loading}
                              className="rounded-r-lg bg-primary px-4 py-2 text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
                            >
                              {loading ? "Sending..." : "Send"}
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <div className="text-center">
                          <div className="mb-4 h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700 mx-auto"></div>
                          <p className="text-gray-500 dark:text-gray-400">Select a user to start chatting</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChatPage; 