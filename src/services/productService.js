// import ProductModel from "../models/ProductModel";
import ProductModel from "../models/ProductModel.js";

export const getFilteredProducts = async (filter, page = 1, limit = 10) => {
    try {
        // Calculate the skip value for pagination
        const skip = (page - 1) * limit;

        // Query the database with the filter, applying pagination
        const products = await ProductModel.find(filter)
            .skip(skip)
            .limit(limit);

        // Get the total number of products matching the filter
        const total = await ProductModel.countDocuments(filter);

        return {
            products,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            totalProducts: total,
        };
    } catch (error) {
        throw new Error('Error fetching products from database');
    }
};
