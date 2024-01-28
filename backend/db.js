import mongoose from "mongoose";

const connectMongo = async () => {
    try {
        await mongoose.connect("mongodb+srv://Naveen2727:Naveen2727@merncluster.msyzpuy.mongodb.net/?retryWrites=true&w=majority");

        console.log("Connected to the database!");

        const foodItemsCollection = mongoose.connection.db.collection("Food_items");
        const foodItemsData = await foodItemsCollection.find({}).toArray();

        const foodCategoryCollection = mongoose.connection.db.collection("Food_Category");
        const foodCategoryData = await foodCategoryCollection.find({}).toArray();

        global.food_items = foodItemsData;
        global.foodcategory = foodCategoryData;
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
};

export default connectMongo;
