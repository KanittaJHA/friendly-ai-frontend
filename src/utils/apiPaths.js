export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const API_VERSION = import.meta.env.VITE_API_VERSION || "v1";

export const API_PATHS = {
  // Authentication routes
  AUTH: {
    REGISTER: `/friendly-api/${API_VERSION}/auth/register`, // Register a new user (Admin or Member)
    LOGIN: `/friendly-api/${API_VERSION}/auth/login`, // Authenticate user & return JWT token
    LOGOUT: `/friendly-api/${API_VERSION}/auth/logout`, // Logout user (or get profile if you implement GET)
    GET_ME: `/friendly-api/${API_VERSION}/auth/me`, // current logged-in user info
  },

  // User management (Admin only)
  USERS: {
    GET_ALL_USERS: `/friendly-api/${API_VERSION}/users`, // Get all users (paginated)
    GET_USER_BY_ID: (userId) => `/friendly-api/${API_VERSION}/users/${userId}`, // Get a single user by ID
  },

  // Conversations routes
  CONVERSATIONS: {
    CREATE_CONVERSATION: `/friendly-api/${API_VERSION}/conversations`, // Start a new conversation
    SEND_MESSAGE: (conversationId) =>
      `/friendly-api/${API_VERSION}/conversations/${conversationId}/messages`, // Send a message in an existing conversation
    GET_CONVERSATION_BY_ID: (conversationId) =>
      `/friendly-api/${API_VERSION}/conversations/${conversationId}`, // Get a conversation by ID (user sees own, admin sees all)
    GET_USER_CONVERSATIONS: `/friendly-api/${API_VERSION}/conversations?page=1&limit=10`, // Get user conversations (paginated)
    SEARCH_USER_CONVERSATIONS: `/friendly-api/${API_VERSION}/conversations?search=AI&mode=search&page=1&limit=10`, // Search user conversations with query
    GET_ALL_CONVERSATIONS: `/friendly-api/${API_VERSION}/conversations/admin/all`, // Admin: get all conversations (paginated)
    DELETE_CONVERSATION: (conversationId) =>
      `/friendly-api/${API_VERSION}/conversations/${conversationId}`, // Delete a conversation by ID (user can delete own)
  },

  // Knowledge base routes
  KNOWLEDGE_BASE: {
    ADD_KNOWLEDGE: `/friendly-api/${API_VERSION}/knowledgebase`, // Admin: add new knowledge
    GET_KNOWLEDGE: `/friendly-api/${API_VERSION}/knowledgebase`, // Get all knowledge (user sees approved/public only)
    UPDATE_KNOWLEDGE: (knowledgeId) =>
      `/friendly-api/${API_VERSION}/knowledgebase/${knowledgeId}`, // Admin: update knowledge by ID
    APPROVE_KNOWLEDGE: (knowledgeId) =>
      `/friendly-api/${API_VERSION}/knowledgebase/${knowledgeId}/approve`, // Admin: approve knowledge (make public)
    DELETE_KNOWLEDGE: (knowledgeId) =>
      `/friendly-api/${API_VERSION}/knowledgebase/${knowledgeId}`, // Admin: delete knowledge by ID
  },
};
