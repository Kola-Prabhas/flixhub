'use client';

import { useSession } from "next-auth/react";
import UnauthPage from "@/components/unauth-page";
import { useAccount } from "@/context";
import ManageAccounts from "@/components/manage-accounts";
import CommonLayout from "@/components/common-layout";
import { useEffect } from "react";
import { getAllFavourites, getTvorMoviesByGenre } from "@/utils";
import CircleLoader from "@/components/circle-loader";

function Tv() {
	const { data: session } = useSession();
	const { loggedInAccount, mediaData, setMediaData, pageLoader, setPageLoader } = useAccount();


	useEffect(() => {
		async function getAllMedia() {
			const actionAdventure = await getTvorMoviesByGenre('tv', 10759);
			const crime = await getTvorMoviesByGenre('tv', 80);
			const comedy = await getTvorMoviesByGenre('tv', 35);
			const family = await getTvorMoviesByGenre('tv', 10751);
			const mystery = await getTvorMoviesByGenre('tv', 9648);
			const reality = await getTvorMoviesByGenre('tv', 10764);
			const scifiAndFantasy = await getTvorMoviesByGenre('tv', 10765);
			const war = await getTvorMoviesByGenre('tv', 10768);
			const western = await getTvorMoviesByGenre('tv', 37);
			const dramaMovies = await getTvorMoviesByGenre('tv', 18);

			const allFavourites = await getAllFavourites(session?.user?.uid, loggedInAccount?._id);

			setMediaData(
				[
					{
						title: "Action and adventure",
						medias: actionAdventure,
					},
					{
						title: "Crime",
						medias: crime,
					},
					{
						title: "Comedy",
						medias: comedy,
					},
					{
						title: "Family",
						medias: family,
					},
					{
						title: "Mystery",
						medias: mystery,
					},
					{
						title: "Reality",
						medias: reality,
					},
					{
						title: "Sci-Fi and Fantasy",
						medias: scifiAndFantasy,
					},
					{
						title: "Western",
						medias: western,
					},
					{
						title: "War",
						medias: war,
					},
					{
						title: "Dramas",
						medias: dramaMovies,
					},
				
				].map(item => ({
					...item,
					medias: item.medias.map(mediaItem => ({
						...mediaItem,
						type: "tv",
						addedToFavourites: allFavourites && allFavourites.length &&
							allFavourites.map(fav => fav.movieId).indexOf(mediaItem.id) != -1
					}))
				}))
			)

			setPageLoader(false);
		}

		getAllMedia();
	}, [loggedInAccount])



	if (session == null) return <UnauthPage />
	if (loggedInAccount == null) return <ManageAccounts />
	if (pageLoader) return <CircleLoader />

	console.log(mediaData)

	return (
		<main className="flex min-h-screen flex-col">
			<CommonLayout mediaData={mediaData} />
		</main>
	);
}


export { Tv as default };