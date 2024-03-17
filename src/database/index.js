import mongoose from 'mongoose';


const connectToDb = async () => {
	try {
		mongoose.connect(
			'mongodb+srv://kolaprabhas2310:6Af183aPzPVzU5Hc@cluster0.kychgwz.mongodb.net/'
		);

		console.log("Connected to database successfully!");
	} catch (e) {
		console.log("An error occurred while connecting to database");		
	}
}


export default connectToDb;