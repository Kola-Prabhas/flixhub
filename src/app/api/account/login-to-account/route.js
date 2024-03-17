import connectToDb from "@/database";
import Account from "@/models/Account";
import { NextResponse } from "next/server";
import { compare } from "bcryptjs";


export const dynamic = "force-dynamic";

export  async function POST(req) {
	try {
		await connectToDb();

		const { pin, accountId, uid } = await req.json();


		const currentAccount = await Account.findOne({ _id: accountId, uid });

		if (!currentAccount) {
			return NextResponse.json({
				success: false,
				message: "Account not found",
			})
		}

		

		const isCorrectPin = await compare(pin, currentAccount.pin);

		if (isCorrectPin) {
			return NextResponse.json({
				success: true,
				message: "Welcome to Netflix"
			})
		} else {
			return NextResponse.json({
				success: false,
				message: "something went wrong"
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