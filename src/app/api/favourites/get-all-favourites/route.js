import connectToDb from "@/database";
import Favourites from "@/models/Favourite";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";

export async function GET(req) {
	try {
		await connectToDb();

		const { searchParams } = new URL(req.url);
		const id = searchParams.get('id');
		const accountId = searchParams.get('accountId');

		const allFavourites = await Favourites.find({ uid: id, accountId });

		console.log('All favourites', allFavourites);


		if (allFavourites) {
			return NextResponse.json({
				success: true,
				data: allFavourites
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