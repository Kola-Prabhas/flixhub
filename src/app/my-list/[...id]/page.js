'use client';

import { useAccount } from "@/context";
import { getAllFavourites } from "@/utils";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { motion } from 'framer-motion';
import Navbar from "@/components/navbar";
import CircleLoader from "@/components/circle-loader";
import MediaItem from "@/components/media-item";
import UnauthPage from "@/components/unauth-page";
import ManageAccounts from "@/components/manage-accounts";

export default function MyList() {

	const { favourites, setFavourites, pageLoader, setPageLoader, loggedInAccount } = useAccount();
	const { data: session } = useSession();



	useEffect(() => {
		async function extractFavourites() {
				const data = await getAllFavourites(session?.user?.uid, loggedInAccount?._id);

				// console.log('session id', session?.user?.uid);
				// console.log('loggedInAccount id', loggedInAccount?._id); 


				// console.log(data);

				if (data) {
					setFavourites(data.map(item => ({
						...item,
						addedToFavourites: true
					})));
					setPageLoader(false);
				}

			
			
			
		}

		extractFavourites();

	}, [loggedInAccount])

	if (session == null) return <UnauthPage />
	if (loggedInAccount == null) return <ManageAccounts />
	if (pageLoader) return <CircleLoader />

	console.log("Favourites in my list", favourites);


	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true }}
		>
			<Navbar />
			<div className="mt-[100px] space-y-0.5 md:space-y-2 px-4">
				<h2 className="cursor-pointer text-sm font-semibold text-[#e5e5e5] transition-colors duration-200 hover:text-white md:text-2xl">
					My List
				</h2>

				<div className="flex flex-wrap justify-center gap-3 items-center scrollbar-hide md:p-2">
					{
						favourites && favourites.length
							? favourites.map(item => <MediaItem key={item.id} media={item} listView={true} />)
							: null
					}
				</div>
			</div>

		</motion.div>
	)
}