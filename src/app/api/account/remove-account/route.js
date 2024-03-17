import connectToDb from "@/database";
import Account from "@/models/Account";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";

export  async function DELETE(req) {
	try {
		await connectToDb();

		const { searchParams } = new URL(req.url);
		const id = searchParams.get('id');

		const deleteAccount = await Account.findByIdAndDelete(id);

		if (deleteAccount) {
			return NextResponse.json({
				success: true,
				message: "Account successfully deleted"
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