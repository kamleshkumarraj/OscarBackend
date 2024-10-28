// models/CardModel.js
import mongoose from 'mongoose';

const CardSchema = new mongoose.Schema({
    HTMLCard: { type: String, required: true },
    JSONCard: { type: Object, required: true }, // To store the card JSON object
    image : {type : String , require : true },
    userId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }

});

const Card = mongoose.model('Card', CardSchema);

export default Card;
