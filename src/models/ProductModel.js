import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title : {
        type : String,
    },
    Description : {
        type : String
    },
    imageUrl: {
        type: String,
        required: true
    },
    imagePublicId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const ProductModel = mongoose.model('ProductDetails', ProductSchema);
export default ProductModel;