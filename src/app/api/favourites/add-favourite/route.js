import connectToDb from "@/database";
import Favourites from "@/models/Favourite";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";

export async function POST(req) {
	try {
		await connectToDb();

		const data  = await req.json();

		

		const favouriteAlreadyExists = await Favourites.find({ uid: data.uid, movieId: data.movieId, accountId: data.accountId });
		


		if (favouriteAlreadyExists && favouriteAlreadyExists.length != 0) {
			return NextResponse.json({
				success: false,
				message: "Try a different movie, Favourite already exists!",
			})
		}



		const favourite = await Favourites.create(data);

		if (favourite) {
			return NextResponse.json({
				success: true,
				message: "favourite successfully created"
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