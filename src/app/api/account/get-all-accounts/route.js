import connectToDb from "@/database";
import Account from "@/models/Account";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";

export  async function GET(req) {
	try {
		await connectToDb();

		const { searchParams } = new URL(req.url);
		const id = searchParams.get('id');

		const allAccounts = await Account.find({uid: id });


		if (allAccounts) {
			return NextResponse.json({
				success: true,
				data: allAccounts
			});
		} else {
			return NextResponse.json({
				success: false,
				message: "Something went wrong"
			});

		}		

	} catch (e) {
		console.log(e);

		return NextResponse.json({
			success: false,
			message: "An error occurred"
		})

	}

}