export const BASE_URL = "http://localhost:3000";

export const API_PATHS = {
  // Authentication routes
  AUTH: {
    REGISTER: "/friendly-api/v1/auth/register", // Register a new user (Admin or Member)
    LOGIN: "/friendly-api/v1/auth/login", // Authenticate user & return JWT token
    LOGOUT: "/friendly-api/v1/auth/logout", // Logout user (or get profile if you implement GET)
    GET_ME: "/friendly-api/v1/auth/me", // current logged-in user info
  },

  // User management (Admin only)
  USERS: {
    GET_ALL_USERS: "/friendly-api/v1/users", // Get all users (paginated)
    GET_USER_BY_ID: (userId) => `/friendly-api/v1/users/${userId}`, // Get a single user by ID
  },

  // Conversations routes
  CONVERSATIONS: {
    CREATE_CONVERSATION: "/friendly-api/v1/conversations", // Start a new conversation
    SEND_MESSAGE: (conversationId) =>
      `/friendly-api/v1/conversations/${conversationId}/messages`, // Send a message in an existing conversation
    GET_CONVERSATION_BY_ID: (conversationId) =>
      `/friendly-api/v1/conversations/${conversationId}`, // Get a conversation by ID (user sees own, admin sees all)
    GET_USER_CONVERSATIONS: "/friendly-api/v1/conversations?page=1&limit=10", // Get user conversations (paginated)
    SEARCH_USER_CONVERSATIONS:
      "/friendly-api/v1/conversations?search=AI&mode=search&page=1&limit=10", // Search user conversations with query
    GET_ALL_CONVERSATIONS: "/friendly-api/v1/conversations/admin/all", // Admin: get all conversations (paginated)
    DELETE_CONVERSATION: (conversationId) =>
      `/friendly-api/v1/conversations/${conversationId}`, // Delete a conversation by ID (user can delete own)
  },

  // Knowledge base routes
  KNOWLEDGE_BASE: {
    ADD_KNOWLEDGE: "/friendly-api/v1/knowledgebase", // Admin: add new knowledge
    GET_KNOWLEDGE: "/friendly-api/v1/knowledgebase", // Get all knowledge (user sees approved/public only)
    UPDATE_KNOWLEDGE: (knowledgeId) =>
      `/friendly-api/v1/knowledgebase/${knowledgeId}`, // Admin: update knowledge by ID
    APPROVE_KNOWLEDGE: (knowledgeId) =>
      `/friendly-api/v1/knowledgebase/${knowledgeId}/approve`, // Admin: approve knowledge (make public)
    DELETE_KNOWLEDGE: (knowledgeId) =>
      `/friendly-api/v1/knowledgebase/${knowledgeId}`, // Admin: delete knowledge by ID
  },
};
