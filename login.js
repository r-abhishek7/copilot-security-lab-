function login(username, password) {
  const validUsername = 'admin';
  const validPassword = 'password123';

  if (username === validUsername && password === validPassword) {
    return { success: true, message: 'Login successful!' };
  }

  return { success: false, message: 'Invalid username or password.' };
}

module.exports = { login };