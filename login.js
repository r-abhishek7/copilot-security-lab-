const bcrypt = require('bcrypt');

// In a real application, this user data would be retrieved securely from a database.
// The hash below is a simulated bcrypt hash for the password 'password123'.
const MOCK_DB = {
  username: 'admin',
  passwordHash: '$2b$10$EPZ0bYk2d... (simulated hash)' 
};

async function login(username, password) {
  // 1. Strict Input Validation: Ensure inputs exist and are the correct data type
  if (typeof username !== 'string' || typeof password !== 'string') {
    return { success: false, message: 'Invalid input format.' };
  }

  const sanitizedUsername = username.trim();
  
  // Prevent empty submissions
  if (!sanitizedUsername || !password) {
    return { success: false, message: 'Username and password are required.' };
  }

  // 2. User Lookup (Simulated DB Query)
  if (sanitizedUsername !== MOCK_DB.username) {
    // Use a generic error message to prevent username enumeration attacks
    return { success: false, message: 'Invalid username or password.' };
  }

  // 3. Secure Password Comparison using Hashing
  try {
    // bcrypt.compare safely hashes the provided plaintext password and compares it to the stored hash
    const isMatch = await bcrypt.compare(password, MOCK_DB.passwordHash);
    
    if (isMatch) {
      return { success: true, message: 'Login successful!' };
    }
    
    return { success: false, message: 'Invalid username or password.' };
  } catch (error) {
    // Catch and log unexpected errors without exposing stack traces to the user
    console.error('Login error:', error);
    return { success: false, message: 'An internal error occurred.' };
  }
}

module.exports = { login };