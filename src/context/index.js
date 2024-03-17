'use client'


import CircleLoader from "@/components/circle-loader";
import { useSession } from "next-auth/react";
import { createContext, useState, useContext, useEffect } from "react";

const GlobalContext = createContext(null);


export function GlobalState({ children }) {
	const [loggedInAccount, setLoggedInAccount] = useState(null);
	const [accounts, setAccounts] = useState([]);
	const [pageLoader, setPageLoader] = useState(true);
	const [mediaData, setMediaData] = useState([]);
	const [searchResults, setSearchResults] = useState([]);
	const [currentMediaInfoIdAndType, setCurrentMediaInfoIdAndType] = useState(null);
	const [showDetailsPopup, setShowDetailsPopup] = useState(false);
	const [mediaDetails, setMediaDetails] = useState(null);
	const [similarMedia, setSimilarMedia] = useState([]);
	const [favourites, setFavourites] = useState([]);

	const { data: session } = useSession();

	useEffect(() => {
		setLoggedInAccount(JSON.parse(sessionStorage.getItem("loggedInAccount")));
	}, [])

	// if (session == null) return <CircleLoader />

	return (
		<GlobalContext.Provider
			value={{
				loggedInAccount,
				setLoggedInAccount,
				accounts,
				setAccounts,
				pageLoader,
				setPageLoader,
				mediaData,
				setMediaData,
				searchResults,
				setSearchResults,
				currentMediaInfoIdAndType,
				setCurrentMediaInfoIdAndType,
				showDetailsPopup,
				setShowDetailsPopup,				
				mediaDetails,
				setMediaDetails,
				similarMedia,
				setSimilarMedia,
				favourites,
				setFavourites
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
}

function useAccount() {
	return useContext(GlobalContext);
}

export { GlobalState as default, useAccount };