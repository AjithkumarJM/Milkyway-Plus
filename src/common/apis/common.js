const API_KEY = "8da54045f3b7ddc995582837526bf146",
  BASE_IMG_URL = "https://image.tmdb.org/t/p/original",
  requests = {
    comedyRoute: `/discover/movie?api_key=${API_KEY}&with_genres=35&primary_release_year=2020`,
    horrorRoute: `/discover/movie?api_key=${API_KEY}&with_genres=27&primary_release_year=2021`,
    actionRoute: `/discover/movie?api_key=${API_KEY}&with_genres=28&primary_release_year=2022`,
  };

export { API_KEY, BASE_IMG_URL, requests };
