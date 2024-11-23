class User {
    constructor(id, name, email, country, city) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.country = country
      this.city = city
    }
  
    updateDetails(details) {
      if (details.name) this.name = details.name;
      if (details.country) this.age = details.country;
      if (details.city) this.city = details.city;
      if (details.email) this.email = details.email;
    }
  
  }
  
  class UserDatabase {
    constructor() {
      this.users = [
        {
            id: 7755419235,
            name: 'Vlody',
            email: 'vlody@gmail.com',
            country: 'Portugal' ,
            city: 'Leiria',
        }
      ];
    }
  
    // Add a new user
    addUser(id, name, email, country, city) {
      const newUser = new User(id, name, email, country, city);
      this.users.push(newUser);
      return newUser;
    }
  
    // Get a user by ID
    getUserById(id) {
      return this.users.find(user => user.id === id);
    }
  
    // Get all users
    getAllUsers() {
      return this.users;
    }
  
    // Update user by ID
    updateUser(id, details) {
      const user = this.getUserById(id);
      if (user) {
        user.updateDetails(details);
        return user;
      } else {
        return null;
      }
    }
  
    // Delete user by ID
    deleteUser(id) {
      const index = this.users.findIndex(user => user.id === id);
      if (index !== -1) {
        this.users.splice(index, 1);
        return true;
      } else {
        return false;
      }
    }
  
  }


  // Create a singleton instance of UserDatabase
const userDB = new UserDatabase();

module.exports = userDB; 
