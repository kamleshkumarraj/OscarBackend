// models/CardModel.js
import mongoose from 'mongoose';

const CardSchema = new mongoose.Schema({
    HTMLCard: { type: String, required: true },
    JSONCard: { type: Object, required: true }, // To store the card JSON object
    image : {type : String , required : true },
    userId: { type: String, required: true },
    price : {type : Number , required : true },
    quantity : {type : Number , required : true },
    createdAt: { type: Date, default: Date.now },
    

});

const Card = mongoose.model('Card', CardSchema);

export default Card;
