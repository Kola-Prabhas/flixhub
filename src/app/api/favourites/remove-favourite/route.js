import connectToDb from "@/database";
import Favourites from "@/models/Favourite";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";

export async function DELETE(req) {
	try {
		await connectToDb();

		const { searchParams } = new URL(req.url);
		const id = searchParams.get('id');

		const deleteFavourite = await Favourites.findByIdAndDelete(id);

		if (deleteFavourite) {
			return NextResponse.json({
				success: true,
				message: "Favourite successfully deleted"
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