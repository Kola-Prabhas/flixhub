const API_KEY = 'e3f89a92c17f9358ad56d1fe72b78b70';
const BASE_URL = 'https://api.themoviedb.org/3';


export const getTrendingMedias = async (type) => {
	try {
		const res = await fetch(`${BASE_URL}/trending/${type}/day?api_key=${API_KEY}&language=en-US`,
			{
				method: 'GET'
			}
		);

		const data = await res.json();

		return data && data.results;
	} catch (e) {
		console.log(e);
	}
}


export const getTopratedMedias = async (type) => {
	try {
		const res = await fetch(`${BASE_URL}/${type}/top_rated?api_key=${API_KEY}&language=en-US`,
			{
				method: 'GET'
			}
		);

		const data = await res.json();

		return data && data.results;
	} catch (e) {
		console.log(e);
	}
}


export const getPopularMedias = async (type) => {
	try {
		const res = await fetch(`${BASE_URL}/${type}/popular?api_key=${API_KEY}&language=en-US`,
			{
				method: 'GET'
			}
		);

		const data = await res.json();

		return data && data.results;
	} catch (e) {
		console.log(e);
	}
}


export const getTvorMoviesByGenre = async (type, id) => {
	try {
		const res = await fetch(`${BASE_URL}/discover/${type}?api_key=${API_KEY}&include_adult=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`,
			{
				method: 'GET'
			}
		);

		const data = await res.json();

		return data && data.results;
	} catch (e) {
		console.log(e);
	}
}


export const getTvorMovieVideoDetailsById = async (type, id) => {
	try {
		const res = await fetch(`${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}&language=en-US&append_to_response=videos`,
			{
				method: 'GET'
			}
		);

		const data = await res.json();

		return data && data.results;
	} catch (e) {
		console.log(e);
	}
}


export const getTvorMovieSearchResults = async (type, query) => {
	try {
		const res = await fetch(`${BASE_URL}/search/${type}?api_key=${API_KEY}&language=en-US&query=${query}`,
			{
				method: 'GET'
			}
		);

		const data = await res.json();

		return data && data.results;
	} catch (e) {
		console.log(e);
	}
}


export const getMediaDetailsById = async (type, id) => {
	try {
		const res = await fetch(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`,
			{
				method: 'GET'
			}
		);

		const data = await res.json();

		return data;
	} catch (e) {
		console.log(e);
	}
}


export const getSimilarTvOrMovies = async (type, id) => {
	try {
		const res = await fetch(`${BASE_URL}/${type}/${id}/similar?api_key=${API_KEY}&language=en-US`,
			{
				method: 'GET'
			}
		);

		const data = await res.json();

		return data && data.results;
	} catch (e) {
		console.log(e);
	}
}


export const getAllFavourites = async (uid, accountId) => {
	try {
		const res = await fetch(`/api/favourites/get-all-favourites?id=${uid}&accountId=${accountId}`,
			{
				method: 'GET'
			}
		);

		const data = await res.json();

		return data && data.data;
	} catch (e) {
		console.log(e);
	}
}