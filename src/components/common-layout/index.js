'use client';


 
import { motion } from 'framer-motion';
import Head from 'next/head';
import Navbar from '../navbar';
import MediaRow from '../media-row';
import Banner from '../banner';



export default function CommonLayout({ mediaData }) {
	
	// console.log("MediaData in common layout", mediaData);
	// console.log("Media[0]", mediaData[0])

	const randomMediaData = mediaData && mediaData.length ? mediaData[Math.floor(Math.random() * mediaData.length)].medias : [];

	// console.log("random mediaData in common layout", randomMediaData)


	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{once: true}}
		>
			<Head>
				<title>Flixhub</title>
			</Head>
			<>
				<Navbar />
				<Banner media={randomMediaData} />
				<div className='relative pb-24 lg:space-y-24'>
					<section className='md:space-y-16'>
						{
							mediaData && mediaData.length
								? mediaData.map(item => {
									return (
										<MediaRow key={item.title}  title={item.title} medias={item.medias} />
									);
								})
								: null
						}
					</section>
				</div>
			</>
		</motion.div>
	)
}