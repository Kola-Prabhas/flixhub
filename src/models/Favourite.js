import mongoose, { mongo } from 'mongoose';


const favouriteSchema = new mongoose.Schema({
	uid: String,
	accountId: String,
	backdrop_path: String,
	poster_path: String,
	movieId: Number,
	type: String
},
	{ timestamps: true }
);


const Favourites = mongoose.models.Favourites || mongoose.model('Favourites', favouriteSchema);


export default Favourites;