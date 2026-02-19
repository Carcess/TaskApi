import bcrypt from 'bcrypt';

// Hash the password for the hardcoded user
const hashedPassword = await bcrypt.hash('doe', 10);

export const users = [
  {
    username: 'doe',
    password: hashedPassword, // Store the hashed password
  },
];
