class Context {
    constructor(chatId, userId, command) {
        this.chatId = chatId
        this.userId = userId
        this.command = command
    }
  
  }
  
  class ContextLists {
    constructor() {
      this.contexts = {};
    }
  
    // Add a new user
    addContext(chatId, userId, command) {
      const context = new Context(chatId, userId, command);
      this.contexts[chatId] = context
    }
  
    // Get a user by ID
    getContextById(chatId) {
        return this.contexts[chatId]
    }
  
    // Get all contexts
    getAllContexts() {
      return this.contexts;
    }
  
    // Update contexts by ID
    updateContext(chatId, command) {
        if(this.contexts.hasOwnProperty(chatId)) {
            this.contexts[chatId].command = command
        } else {
            console.log(`[INFO]: No chat id`)
        }
    }
  
    // Delete context by chatID
    deleteContext(chatId) {
        delete this.contexts[chatId]
    }
  
  }


  // Create a singleton instance of UserDatabase
const contexts = new ContextLists();

module.exports = contexts; 
