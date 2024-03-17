'use client';


import { AiOutlineSearch } from 'react-icons/ai';



export default function Search({
	pathName,
	router,
	searchQuery,
	setSearchQuery,
	setPageLoader,
	setShowSearchBar }) {
	
	function handleSubmit(e) {
		if (e.key == 'Enter' && searchQuery && searchQuery.trim() != '') {
			setPageLoader(true);

			if (pathName.includes('/search')) {
				router.replace(`/search/${searchQuery}`);
			} else {
				router.push(`/search/${searchQuery}`);
			}
		}
	}
	
	return (
		// <div className="flex justify-center items-center text-center">
			<div className="bg-[rgba(0,0,0,0.75)] border border-[hsla(0,0%,100%,0.85)] px-1 md:px-4 items-center text-center flex">
				<div className="w-[100px] sm:w-[auto] order-2">
					<input 
						name="search"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						onKeyUp={handleSubmit}
						placeholder="Movies, Webseries, Originals..."
					className="bg-transparent text-[10px] md:text-[14px] font-medium h-[28px] md:h-[34px] px-4 py-2 placeholder:text-[10px] md:placeholder:text-[14px] font-md text-white outline-none w-[100%]"
					/>
				</div>
				<button className="px-2.5">
					<AiOutlineSearch
						onClick={() => setShowSearchBar(false)}
						className='inline sm:w-6 sm:h-6 cursor-pointer'
					/>
				</button>

			</div>
		// </div>
	)
}