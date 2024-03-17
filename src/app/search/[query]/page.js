'use client';

import { useSession } from "next-auth/react";
import UnauthPage from "@/components/unauth-page";
import { useAccount } from "@/context";
import ManageAccounts from "@/components/manage-accounts";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { getAllFavourites, getTvorMovieSearchResults } from "@/utils";
import CircleLoader from "@/components/circle-loader";
import { motion } from 'framer-motion';
import Navbar from "@/components/navbar";
import MediaItem from "@/components/media-item";

function Search() {
	const { data: session } = useSession();
	const { loggedInAccount, pageLoader, setPageLoader, searchResults, setSearchResults } = useAccount();
	const params = useParams();


	useEffect(() => {

		async function getSearchResults() {
			const tvShows = await getTvorMovieSearchResults('tv', params.query);
			const movies = await getTvorMovieSearchResults('movie', params.query);

			const allFavourites = await getAllFavourites(session?.user?.uid, loggedInAccount?._id);

			setSearchResults([
				...tvShows.filter(item => item.backdrop_path && item.poster_path)
					.map(item => ({
						...item,
						type: 'tv',
						addedToFavourites: allFavourites && allFavourites.length &&
							allFavourites.map(fav => fav.movieId).indexOf(item.id) != -1
					})),
				
				...movies.filter(item => item.backdrop_path && item.poster_path)
					.map(item => ({
						...item,
						type: 'movie',
						addedToFavourites: allFavourites && allFavourites.length &&
							allFavourites.map(fav => fav.movieId).indexOf(item.id) != -1
					}))
			])

			setPageLoader(false); 

			console.log(tvShows, movies);

		}

		getSearchResults();
		
	}, [loggedInAccount])


	if (session == null) return <UnauthPage />
	if (loggedInAccount == null) return <ManageAccounts />
	if (pageLoader) return <CircleLoader />

	

	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true }}
		>
			<Navbar />
			<div className="mt-[100px] space-y-0.5 md:space-y-2 px-4">
				<h2 className="cursor-pointer text-sm font-semibold text-[#e5e5e5] transition-colors duration-200 hover:text-white md:text-2xl">
					showing results for {decodeURI(params.query)}
				</h2>
			
				<div className="grid grid-cols-5 gap-3 items-center scrollbar-hide md:p-2">
					{
						searchResults && searchResults.length
							? searchResults.map(item => <MediaItem key={item.id} media={item} searchView={true} />)
							: null
					}
				</div>
			</div>

		</motion.div>
	);
}


export { Search as default };