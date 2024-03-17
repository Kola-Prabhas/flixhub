import mongoose from 'mongoose';


const AccountSchema = new mongoose.Schema({
	name: String,
	uid: String,
	pin: String,
}, { timestamps: true });

const Account = mongoose.models.Account || mongoose.model("Account", AccountSchema);

export default Account;