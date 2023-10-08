import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import userRepository from "../data/repositories/userRepository.js";
(await import('dotenv')).config();

const tokenSecret = process.env.SERVER_TOKEN_SECRET;

const userService = {
  register: async (email, password) => {
    const hash = await argon2.hash(password);
    await userRepository.create(email, hash);
  },

  // Generate a token with the username
  login: async (email, password) => {
    const connectionInfo = await userRepository.getConnectionInfo(email);
    const authorized = await argon2.verify(connectionInfo.password, password);
    if (!authorized) throw "Invalid username or password";
    const jwtPayload = { authorized: true, username: email };
    return jwt.sign(jwtPayload, tokenSecret, { expiresIn: '5000h' });
  },

  currentUser: (bearerToken) => {
    if (!bearerToken) return null;
    const token = bearerToken?.split(' ')[1];
    try{
      const verifiedToken = jwt.verify(token, tokenSecret)
      return Promise.resolve(verifiedToken);
    }
    catch{
      return Promise.resolve({});
    }
  }
}

export default userService;