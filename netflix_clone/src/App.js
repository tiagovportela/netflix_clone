import React, { useEffect, useState } from 'react'
import './App.css'
import TMdb from './TMdb'
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie'

export default () => {

  const [movieList, setMovieList] = useState([]); 
  const [featuredData, setFeaturedData] = useState(null); 


  useEffect(()=>{
    const loadAll = async () => {
      let list = await TMdb.getHomeList();
      setMovieList(list);
      
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random()*originals[0].items.results.length);
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await TMdb.getMovieInfo(chosen.id, 'tv');
      console.log('console.log(chosenInfo) - console.log(chosenInfo)')
      
      setFeaturedData(chosenInfo);
      console.log(chosenInfo);
    }
    loadAll();
  }, [])

  return (
    <div className = 'page'>
      {/* Header
      Destaque
      Listas
      Footer */}
      {/* <FeaturedMovie item={featuredData}/> */}
      { featuredData &&
        <FeaturedMovie item = {featuredData} />
      }

      <section className='lists'>
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>
    </div>
  )
} 