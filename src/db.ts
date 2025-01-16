import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI as string;
        console.log("mongodb uri",mongoUri);
        
        if (!mongoUri) {
            throw new Error('MONGO_URI is not defined in the environment variables');
        }

        const conn = await mongoose.connect(mongoUri);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
        } else {
            console.error('Unknown error:', error);
        }
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
