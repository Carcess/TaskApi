import bcrypt from 'bcrypt';

// Hashar lösenordet "doe" med bcrypt och 10 saltomgångar
const hashedPassword = await bcrypt.hash('doe', 10);

// En lista med hårdkodade användare
export const users = [
  {
    username: 'doe', // Användarnamn
    password: hashedPassword, // Det hashade lösenordet för användaren
  },
];
