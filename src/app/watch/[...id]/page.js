'use client';


import CircleLoader from "@/components/circle-loader";
import { useAccount } from "@/context";
import { getTvorMovieVideoDetailsById } from "@/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import ReactPlayer from "react-player/youtube";


export default function Watch() {
	const [mediaDetails, setMediaDetails] = useState(null);
	const [trailerKey, setTrailerKey] = useState(null);
	const params = useParams();
	const { pageLoader, setPageLoader } = useAccount();
	
	useEffect(() => {
		async function getMediaDetails() {
			const extractMediaDetails = await getTvorMovieVideoDetailsById(params.id[0], params.id[1]);

			// console.log('Media video deatils in watch', extractMediaDetails);

			if (extractMediaDetails) {
				const trailerIndex = extractMediaDetails.findIndex(item => item.type == 'Trailer');
				const clipIndex = extractMediaDetails.findIndex(item => item.type == 'Clip');


				let videoKey;

				if (trailerIndex != -1) videoKey = extractMediaDetails[trailerIndex].key;
				else if (clipIndex != -1) videoKey = extractMediaDetails[clipIndex].key;
				else videoKey = 'wyEOwHrpZH4';

				setMediaDetails(extractMediaDetails);
				setTrailerKey(videoKey);
				setPageLoader(false);
			}			
		}

		getMediaDetails();
	}, [params])

	if (pageLoader && mediaDetails == null) return <CircleLoader />

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
			<ReactPlayer
				url={`https://www.youtube.com/watch?v=${trailerKey}`}
				width={'100%'}
				height={'100%'}
				style={{ position: 'absolute', top: '0', left: '0' }}
				playing
				controls
			/>
		</motion.div>
	)
}