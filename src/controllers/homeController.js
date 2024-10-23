// controllers/homeController.js
import { getMessage } from '../models/messageModel.js';
import { renderMessage } from '../views/homeView.js';

export const home = (req, res) => {
  const message = getMessage();
  res.send(renderMessage(message));
};
