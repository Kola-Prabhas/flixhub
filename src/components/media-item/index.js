'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { PlusIcon, ChevronDownIcon, CheckIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter } from 'next/navigation';
import { useAccount } from '@/context';
import { useSession } from 'next-auth/react';
import { getAllFavourites } from '@/utils';


const baseUrl = 'https://image.tmdb.org/t/p/w500';


export default function MediaItem({ media, title, searchView=false, listView=false, similarView=false }) {
	const router = useRouter();
	const pathName = usePathname();
	const { data: session } = useSession();
	
	const { setShowDetailsPopup, loggedInAccount, setFavourites, setCurrentMediaInfoIdAndType,
		searchResults, setSearchResults, similarMedia, setSimilarMedia, mediaData, setMediaData } = useAccount();
	

	async function updatFavourites() {
		const res = await getAllFavourites(session?.user?.uid, loggedInAccount?._id);

		if (res) setFavourites(res.map(item => ({
			...item,
			addedToFavourites: true
		})))
	}

	async function handleAddToFavourites(item) {
		const { backdrop_path, poster_path, id, type } = item;

		const res = await fetch('/api/favourites/add-favourite', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				backdrop_path,
				poster_path,
				movieId: id,
				type,
				uid: session?.user?.uid,
				accountId: loggedInAccount?._id
			})
		});



		const data = await res.json();

		if (data && data.success) {
			if (pathName.includes('my-list')) updatFavourites();

			if (searchView) {
				let updatedSearchResults = [...searchResults];
				const indexOfCurrentAddedMedia = updatedSearchResults.findIndex(item => item.id == id);

				updatedSearchResults[indexOfCurrentAddedMedia].addedToFavourites = true;

				setSearchResults(updatedSearchResults);
			} else if (similarView) {
				let updatedSimilarResults = [...similarMedia];

				const indexOfCurrentAddedMedia = updatedSimilarResults.findIndex(item => item.id == id);

				updatedSimilarResults[indexOfCurrentAddedMedia].addedToFavourites = true;

				setSimilarMedia(updatedSimilarResults);

			} else {
				let updatedMediaData = [...mediaData];

				const indexOfRowItem = updatedMediaData.findIndex(item => item.title == title);

				let currentMovieArray = updatedMediaData[indexOfRowItem].medias;

				const indexOfCurrentMovie = currentMovieArray.findIndex(item => item.id == id);

				currentMovieArray[indexOfCurrentMovie].addedToFavourites = true;

				setMediaData(updatedMediaData);
				
			}
		}
	}


	async function handleRemoveFavourites(item) {
		const res = await fetch(`/api/favourites/remove-favourite?id=${item._id}`, {
			method: 'DELETE',
		});

		const data = await res.json();

		if (data.success) {
			updatFavourites();
		}
	}

	
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.5 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{
				duration: 0.8,
				delay: 0.5,
				ease: [0, 0.71, 0.2, 1.01]
			}}
		>
			<div className="relative cardWrapper h-28 min-w-[180px] cursor-pointer md:h-36 md:min-w-[260px] transform transition duration-500 hover:scale-110 hover:z-[999]">
				<Image 
					src={`${baseUrl}${media?.backdrop_path || media?.poster_path}`}
					onClick={() => {
						router.push(`/watch/${media?.type}/${ listView? media?.movieId: media?.id}`)
					}}
					alt="Media"
					layout="fill"
					className="rounded md:rounded hover:rounded-sm"
				/>

				<div className="space-x-3 hidden absolute p-2 bottom-0 buttonWrapper">
					<button
						className={`${media?.addedToFavourites && !listView && "cursor-not-allowed"} cursor-pointer border flex p-2 items-center gap-x-2 rounded-full  text-sm font-semibold transition hover:opacity-90 border-white bg-black opacity-75 text-black`}
						onClick={
							media?.addedToFavourites
								? listView ? () => handleRemoveFavourites(media) : null
								: () => handleAddToFavourites(media)
						}
					>
						{
							media?.addedToFavourites ? (
								<CheckIcon color="#ffffff" className="h-7 w-7" />
							) : (
								<PlusIcon color="#ffffff" className="h-7 w-7" />
							)
						}
					</button>
					<button
						className='cursor-pointer p-2 border flex items-center gap-x-2 rounded-full  text-sm font-semibold transition hover:opacity-90  border-white  bg-black opacity-75'
						onClick={() => {
							setCurrentMediaInfoIdAndType({
								type: media?.type,
								id: media?.id
							});
							setShowDetailsPopup(true);
						}}
					>
						<ChevronDownIcon color="#ffffff" className='h-7 w-7' />
					</button>
				</div>
			</div>
			
		</motion.div>
	)
}