import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import dataContext from "../data/dataContext.js";

const tokenSecret = process.env.SERVER_TOKEN_SECRET;

const userService = {
  register: async (email, password) => {
    const hash = await argon2.hash(password);
    await dataContext.userRepository.create(email, hash);
  },

  // Generate a token with the username
  login: async (email, password) => {
    const connectionInfo = await dataContext.userRepository.getConnectionInfo(email);
    const authorized = await argon2.verify(connectionInfo[0].password, password);
    if (!authorized) throw "Invalid username or password";
    const jwtPayload = { authorized: true, username: email };
    return jwt.sign(jwtPayload, tokenSecret, { expiresIn: '1000h' });
  },

  currentUser: (bearerToken) => {
    const token = bearerToken.split(' ')[1];
    return Promise.resolve(jwt.verify(token, tokenSecret));
  }
}

export default userService;