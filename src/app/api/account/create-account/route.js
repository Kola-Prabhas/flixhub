import connectToDb from "@/database";
import Account from "@/models/Account";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";


export const dynamic = "force-dynamic";

export  async function POST(req) {
	try {
		await connectToDb();

		const { name, uid, pin } = await req.json();

		// console.log("pin", pin);
		// console.log("name", name);
		// console.log("uid", uid);

		const accountAlreadyExists = await Account.find({ name, uid });
		
		// console.log("accountAlreadyExists", accountAlreadyExists);

		if (accountAlreadyExists && accountAlreadyExists.length != 0) {
			return NextResponse.json({
				success: false,
				message: "Try with a different account, Account already exists!",
			})
		}

		const allAccounts = await Account.find({});

		// console.log("allAccounts");

		
		if (allAccounts && allAccounts.length == 4) {
			return NextResponse({
				success: false,
				message: "Max accounts reached, can't create an account"
			})
		}

		const hashedPin = await hash(pin, 12);

		// console.log("hash created", hashedPin);

		const account = await Account.create({
			name,
			uid,
			pin: hashedPin
		});

		if (account) {
			return NextResponse.json({
				success: true,
				message: "Account successfully created"
			})
		} else {
			return NextResponse.json({
				success: false,
				message: "An error occurred"
			})
		}

	} catch (e) {
		console.log(e);

		return NextResponse.json({
			success: false,
			message: "An error occurred"
		})
		
	}

}