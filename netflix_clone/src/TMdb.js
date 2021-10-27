const API_KEY = '9061a7eb71f41ca7b6b9dcdb93cdbd9c'
const API_BASE = 'https://api.themoviedb.org/3/'

/*
- originais
- recomendados (trending)
- em alta (top rated)
- açao
- comedia
- romance
- documentarios

*/ 

const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json
}

export default {
    getHomeList: async () => {
        return [
            {
                slug : 'originals',
                title: 'Originals Netflix',
                items: await basicFetch(`discover/tv?with_networks=213&api_key=${API_KEY}`)
            },
            // {
            //     slug : 'trending',
            //     title: 'Recomendados',
            //     items: await basicFetch(`trending/all/week&api_key=${API_KEY}`)
            // },
            // {
            //     slug : 'toprated',
            //     title: 'Em Alta',
            //     items: await basicFetch(`movie/top_rated&api_key=${API_KEY}`)
            // },
            {
                slug : 'action',
                title: 'Ação',
                items: await basicFetch(`discover/movie?with_genres=28&api_key=${API_KEY}`)
            },
            {
                slug : 'comedy',
                title: 'Comedia',
                items:  await basicFetch(`discover/movie?with_genres=25&api_key=${API_KEY}`)
            },
            {
                slug : 'romance',
                title: 'Romance',
                items:  await basicFetch(`discover/movie?with_genres=10749&api_key=${API_KEY}`)
            },
            {
                slug : 'documentary',
                title: 'Documentario',
                items:  await basicFetch(`discover/movie?with_genres=99&api_key=${API_KEY}`)
            },
        ]
    },
    getMovieInfo: async (movieId, type) => {
        let info = {};

        if(movieId){
            switch(type){
                case 'movie':
                    info = await basicFetch(`movie/${movieId}?api_key=${API_KEY}`);
                break;
                case 'tv':
                    info = await basicFetch(`tv/${movieId}?api_key=${API_KEY}`);
                break;
            }
        }

        return info;
    }

}