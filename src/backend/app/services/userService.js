import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import userRepository from "../sql/userRepository.js";
(await import('dotenv')).config();

const tokenSecret = process.env.SERVER_TOKEN_SECRET;
//hashing the password
const userService = {
  register: async (email, password) => {
    const hash = await argon2.hash(password);
    await userRepository.create(email, hash);
  },

  // Generate a token with the username
  login: async (email, password) => {
    const connectionInfo = await userRepository.getConnectionInfo(email);
    if (!connectionInfo) {
      throw "Invalid username or password";
    }
    // Verify the password
    const authenticated = await argon2.verify(connectionInfo.password, password);
    if (!authenticated){
      throw "Invalid username or password";
    }

    const tokenContent = { authenticated, username: email, id: connectionInfo.id };
    // D'autres informations peuvent être ajoutées au token
    return {
      ...tokenContent,
      token: jwt.sign(tokenContent, tokenSecret, { expiresIn: '5000h' })
    }
  },
     // Get the username from a token
  getCurrentUser: (req) => {
    const token = req.headers.authorization?.split(' ')[1];
    try{
      return { ip: req.ip, ...jwt.verify(token, tokenSecret) };
    }
    catch {
      return { ip: req.ip, authenticated: false };
    }
  }
}

export default userService;