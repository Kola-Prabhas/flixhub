'use client';


import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Search from "./search";
import { AiOutlineSearch } from 'react-icons/ai';
import { useAccount } from "@/context";
import AccountPopup from "./account-popup";
import DetailsPopup from "../details-popup";




export default function Navbar() {
	const { data: session } = useSession();
	const [isScrolled, setIsScrolled] = useState(false);
	const [showSearchBar, setShowSearchBar] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [showAccountPopUp, setShowAccountPopUp] = useState(false);
	const router = useRouter();
	const pathName = usePathname();
	const [showX, setShowX] = useState(false);

	const { setPageLoader, accounts, setAccounts, loggedInAccount, setLoggedInAccount, showDetailsPopup, setShowDetailsPopup } = useAccount();

	const menuItems = [
		{
			id: 'home',
			title: 'Home',
			path: '/browse'
		},
		{
			id: 'tv',
			title: 'Tv',
			path: '/tv'
		},
		{
			id: 'movies',
			title: 'Movies',
			path: '/movies'
		},
		{
			id: 'my-list',
			title: 'My List',
			path: `/my-list/${session?.user?.uid}/${loggedInAccount._id}`
		}
	];


	useEffect(() => {
		function handleScroll() {
			if (window.scrollY > 0) setIsScrolled(true);
			else setIsScrolled(false);
		}


		window.addEventListener('scroll', handleScroll);


		return () => {
			window.removeEventListener('scroll', handleScroll);
		}
	}, []);

	async function getAllAccounts() {
		const res = await fetch(`/api/account/get-all-accounts?id=${session?.user?.uid}`, {
			method: 'GET'
		});

		const data = await res.json();

		// console.log(data);

		if (data && data.data && data.data.length) {
			setAccounts(data.data);
		} else {
			setAccounts([]);
		}

		setPageLoader(false);
	}

	function handleIconClick() {
		setShowX(!showX);
	}


	useEffect(() => {
		getAllAccounts();
	}, []);


	// console.log("loggedInAccount", loggedInAccount);
	// console.log("Name", loggedInAccount.name);



	return (
		<div >
			<header className={`header ${isScrolled && "bg-[#141414]"} hover:bg-[#141414]`}>
				<div className="flex items-center space-x-2 md:space-x-10">
					<img src="/flixhub.svg"
						alt="FLIXHUB"
						width={120}
						height={120}
						className="cursor-pointer object-contain"
						onClick={() => router.push('/browse')}
					/>
					<ul className="hidden md:space-x-4 md:flex cursor-pointer">
						{
							menuItems.map(item => {
								return (
									<li className="cursor-pointer text-[16px] font-light text-[#e5e5e5] transition duration-[.4s] hover:text-[#b3b3b3]"
										key={item.id}
										onClick={() => {
											setSearchQuery("");
											router.push(item.path);
											setPageLoader(true);
											setShowSearchBar(false);
										}}
									>
										{item.title}
									</li>
								);
							})
						}
					</ul>
				</div>
				<div className="font-light flex items-center space-x-4 text-sm">
					
						{
							showSearchBar ? (
								<Search
									pathName={pathName}
									router={router}
									searchQuery={searchQuery}
									setSearchQuery={setSearchQuery}
									setPageLoader={setPageLoader}
									setShowSearchBar={setShowSearchBar}
								/>)
								: (
									<AiOutlineSearch
										onClick={() => setShowSearchBar(true)}
										className="inline sm:w-6 sm:h-6 cursor-pointer"
									/>
								)
						}

					
				

					<div
						className="md:hidden cursor-pointer"
						onClick={handleIconClick}
					>
						{
							showX ? (
								<>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
										<path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
									</svg>

									<ul className="fixed top-20 space-y-2 flex flex-col cursor-pointer bg-[#141414] px-4 py-2 rounded">
										{
											menuItems.map(item => {
												return (
													<li className="cursor-pointer text-[16px] font-light text-[#e5e5e5] transition duration-[.4s] hover:text-[#b3b3b3]"
														key={item.id}
														onClick={() => {
															setSearchQuery("");
															router.push(item.path);
															setPageLoader(true);
															setShowSearchBar(false);
															setShowX(false)
														}}
													>
														{item.title}
													</li>
												);
											})
										}
									</ul>
								</>								
							) : (
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
									<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
								</svg>	
						    )
								
						}				
						

					</div>
					


					<div
						onClick={() => setShowAccountPopUp(!showAccountPopUp)}
						className="flex gap-2 items-center cursor-pointer"
					>
						<img src="https://occ-0-2611-3663.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfNXUMVXGhnCZwPI1SghnGpmUgqS_J-owMff-jig42xPF7vozQS1ge5xTgPTzH7ttfNYQXnsYs4vrMBaadh4E6RTJMVepojWqOXx.png?r=1d4"
							alt="Current Profile"
							className="max-w-[30px] rounded min-w-[20px] max-h-[30px] min-h-[20px] object-cover w-[30px] h-[30px]"
						/>	
						
						<p className="hidden md:block">{loggedInAccount && loggedInAccount.name}</p>
						
					</div>

				</div>

			</header>

			<DetailsPopup
				show={showDetailsPopup}
				setShow={setShowDetailsPopup}
			/>

			{
				showAccountPopUp &&(  <AccountPopup 
					accounts={accounts}
					setPageLoader={setPageLoader}
					signOut={signOut}
					loggedInAccount={loggedInAccount}
					setLoggedInAccount={setLoggedInAccount}
				/>
				)				
			}
		</div>
	);
}