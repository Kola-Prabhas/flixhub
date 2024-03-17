'use client';

import UnauthPage from "@/components/unauth-page";
import { useSession } from "next-auth/react";
import { useAccount } from "@/context";
import { useEffect } from "react";
import ManageAccounts from "@/components/manage-accounts";
import CommonLayout from "@/components/common-layout";
import CircleLoader from "@/components/circle-loader";
import { getAllFavourites, getTvorMoviesByGenre } from "@/utils";

function Movies() {
	const { data: session } = useSession();
	const { loggedInAccount, mediaData, setMediaData, setPageLoader, pageLoader } = useAccount();


	useEffect(() => {
		async function getAllMedias() {
			const action = await getTvorMoviesByGenre("movie", 28);
			const adventure = await getTvorMoviesByGenre("movie", 12);
			const crime = await getTvorMoviesByGenre("movie", 80);
			const comedy = await getTvorMoviesByGenre("movie", 35);
			const family = await getTvorMoviesByGenre("movie", 10751);
			const mystery = await getTvorMoviesByGenre("movie", 9648);
			const romance = await getTvorMoviesByGenre("movie", 10749);
			const scifiAndFantasy = await getTvorMoviesByGenre("movie", 878);
			const war = await getTvorMoviesByGenre("movie", 10752);
			const history = await getTvorMoviesByGenre("movie", 36);
			const drama = await getTvorMoviesByGenre("movie", 18);
			const thriller = await getTvorMoviesByGenre("movie", 53);
			const horror = await getTvorMoviesByGenre("movie", 27);

			const allFavourites = await getAllFavourites(session?.user?.uid, loggedInAccount?._id);
			
			setMediaData(
				[
					{
						title: "Action",
						medias: action,
					},
					{
						title: "Adventure",
						medias: adventure,
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
						title: "Horror",
						medias: horror,
					},
					{
						title: "History",
						medias: history,
					},
					{
						title: "Romance",
						medias: romance,
					},
					{
						title: "Sci-Fi and Fantasy",
						medias: scifiAndFantasy,
					},
					{
						title: "Thriller",
						medias: thriller,
					},
					{
						title: "War",
						medias: war,
					},
					{
						title: "Dramas",
						medias: drama,
					},
				].map((item) => ({
					...item,
					medias: item.medias.map((mediaItem) => ({
						...mediaItem,
						type: "movie",
						addedToFavourites: allFavourites && allFavourites.length &&
							allFavourites.map(fav => fav.movieId).indexOf(mediaItem.id) != -1

					})),
				}))
			);
			setPageLoader(false);
		}

		getAllMedias();
	}, [loggedInAccount]);



	if (session == null) return <UnauthPage />
	if (loggedInAccount == null) return <ManageAccounts />
	if (pageLoader) return <CircleLoader />


	return (
		<main className="flex min-h-screen flex-col">
			<CommonLayout mediaData={mediaData} />
		</main>
	)
}


export { Movies as default };