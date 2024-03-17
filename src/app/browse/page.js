'use client';


import UnauthPage from "@/components/unauth-page";
import { useAccount } from "@/context";
import { useSession } from "next-auth/react";
import ManageAccounts from "@/components/manage-accounts";
import CommonLayout from "@/components/common-layout";
import { useEffect } from "react";
import { getAllFavourites, getPopularMedias, getTopratedMedias, getTrendingMedias } from "@/utils";
import CircleLoader from "@/components/circle-loader";

function Browse() {
	const { data: session } = useSession();
	const { loggedInAccount, mediaData, setMediaData, pageLoader, setPageLoader } = useAccount();
	

	console.log("your session is ", session);
	
	useEffect(() => {
		async function getAllMedia() {
			const trendingTvShows = await getTrendingMedias('tv');
			const popularTvShows = await getPopularMedias('tv');
			const topratedTvShows = await getTopratedMedias('tv');

			const trendingMovieShows = await getTrendingMedias('movie');
			const popularMovieShows = await getPopularMedias('movie');
			const topratedMovieShows = await getTopratedMedias('movie');

			const allFavourites = await getAllFavourites(session?.user?.uid, loggedInAccount?._id);

			const tvShows = [
				{
					title: 'Trending Tv Shows',
					medias: trendingTvShows
				},
				{
					title: 'Popular Tv Shows',
					medias: popularTvShows
				},
				{
					title: 'Top rated Tv Shows',
					medias: topratedTvShows
				}
			].map(item => {
				return {
					...item,
					medias: item.medias.map(mediaItem => {
						return {
							...mediaItem,
							type: 'tv',
							addedToFavourites: allFavourites && allFavourites.length &&
								allFavourites.map(fav => fav.movieId).indexOf(mediaItem.id) != -1								
						}
					})
				}
			});


			const movieShows = [
				{
					title: 'Trending Movie',
					medias: trendingMovieShows
				},
				{
					title: 'Popular Movie',
					medias: popularMovieShows
				},
				{
					title: 'Top rated Movie',
					medias: topratedMovieShows
				}
			].map(item => {
				return {
					...item,
					medias: item.medias.map(mediaItem => {
						return {
							...mediaItem,
							type: 'movie',
							addedToFavourites: allFavourites && allFavourites.length &&
								allFavourites.map(fav => fav.movieId).indexOf(mediaItem.id) != -1	
						}
					})
				}
			});

			setMediaData([
				...tvShows,
				...movieShows
			])


			setPageLoader(false);
		}

		getAllMedia();
        
	}, [])


	if (session == null) return <UnauthPage />
	if (loggedInAccount == null) return <ManageAccounts />
	if (pageLoader) return <CircleLoader />


	console.log("media data", mediaData);

	return (
		<main className="flex min-h-screen flex-col">
			<CommonLayout mediaData={mediaData} />
		</main>
	)
}


export { Browse as default };
