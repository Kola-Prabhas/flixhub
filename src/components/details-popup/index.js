'use client';


import { motion } from 'framer-motion';
import MuiModal from '@mui/material/Modal';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useAccount } from '@/context';
import { useEffect, useState } from 'react';
import { getSimilarTvOrMovies, getMediaDetailsById, getAllFavourites } from '@/utils';
import ReactPlayer from 'react-player';
import MediaItem from '../media-item';
import { AiFillPlayCircle } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function DetailsPopup({ show, setShow, media }) {
	const { loggedInAccount, mediaDetails, setMediaDetails, similarMedia, setSimilarMedia, currentMediaInfoIdAndType, setCurrentMediaInfoIdAndType } = useAccount();
	const [key, setKey] = useState(null);
	const { data: session } = useSession();


	const router = useRouter();

	function handleClose() {
		setShow(false);
		setCurrentMediaInfoIdAndType(null);
	}


	// console.log('Current Media Info and Type', currentMediaInfoIdAndType);

	useEffect(() => {
		if (currentMediaInfoIdAndType != null) {
			async function getMediaDetails() {
				const extractMediaDetails = await getMediaDetailsById(currentMediaInfoIdAndType.type, currentMediaInfoIdAndType.id);
				const extractSimilarMovies = await getSimilarTvOrMovies(currentMediaInfoIdAndType.type, currentMediaInfoIdAndType.id);

				const allFavourites = await getAllFavourites(session?.user?.uid, loggedInAccount?._id);

				const trailerIndex = extractMediaDetails?.videos?.results?.findIndex(item => item.type == 'Trailer');
				const clipIndex = extractMediaDetails?.videos?.results?.findIndex(item => item.type == 'Clip');

				let videoKey;

				// console.log('media Details by id in details popup', extractMediaDetails);
				// console.log('similar movies', extractSimilarMovies);


				if (trailerIndex != -1 && trailerIndex != undefined) videoKey = extractMediaDetails.videos.results[trailerIndex].key;
				else if (clipIndex != -1 && trailerIndex != undefined) videoKey = extractMediaDetails.videos.results[clipIndex].key;
				else videoKey = 'wyEOwHrpZH4';
				

				setMediaDetails(extractMediaDetails);
				setKey(videoKey);
				setSimilarMedia(extractSimilarMovies?.map(item => {
					return {
						...item,
						type: currentMediaInfoIdAndType.type,
						addedToFavourites: allFavourites && allFavourites.length &&
							allFavourites.map(fav => fav.movieId).indexOf(item.id) != -1
					}
				}))

			}

			getMediaDetails();
		}

	}, [currentMediaInfoIdAndType, loggedInAccount])


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
			<MuiModal
				open={show}
				onClose={handleClose}
				className="fixed !top-7 left-0 right-0 z-50 w-full mx-auto max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide border border-white"
			>
				<div>
					<button
						onClick={handleClose}
						className="modalButton flex items-center justify-center absolute top-5 right-5 bg-[#181818] hover:bg-[#181818] !z-40 border-none h-9 w-9"
					>
						<XMarkIcon className='h-6 w-6' />
					</button>

					<div className='relative pt-[56.25%] border border-white'>
						<ReactPlayer
							url={`https://www.youtube.com/watch?v=${key}`}
							width={'100%'}
							height={'100%'}
							style={{ position: 'absolute', top: '0', left: '0' }}
							playing
							controls
						/>

						<div className='absolute bottom-[4.25rem] flex w-full items-center justify-between pl-[1.5rem]'>
							
								<button
									className="cursor-pointer flex items-center gap-x-2 rounded px-5 py-1.5 text-sm font-semibold transition hover:opacity-75 md:py-2.5 md:px-8 md:text-xl bg-white text-black"
									onClick={() => router.push(`/watch/${currentMediaInfoIdAndType?.type}/${currentMediaInfoIdAndType?.id}`)}
								>
									<AiFillPlayCircle className="h-4 w-4 text-black md:h-7 md:w-7" />
									Play
								</button>
							
						</div>
					</div>					

					<div className='rounded-b-md bg-[#181818] p-8'>
						<div className='space-x-2 pb-4 flex gap-4'>
							<div className='text-green-400 font-semibold flex items-center gap-2'>
								<span>
									{
										mediaDetails?.release_date?.split("-")[0] || '2023'
									}
								</span>
								<div className='inline-flex border-2 border-white/400  rounded px-2'>
									HD
								</div>
							</div>

						</div>

						<h2 className="cursor-pointer mt-10 mb-6 text-sm font-semibold text-[#e5e5e5] transition-colors duration-200 hover:text-white md:text-2xl">
							More Like This
						</h2>

						<div className='flex flex-wrap items-center justify-center md:p-2 gap-3 scrollbar-hide'>
							{
								similarMedia?.length ? similarMedia.filter(item => item.backdrop_path && item.poster_path)
									.map(item => {
										return (
											<MediaItem
												key={item.id}
												media={item}
												similarView={true}
											/>
										)
									}) : null
							}
						</div>

					</div>			


				</div>
			</MuiModal>

		</motion.div>
	)
	
}