import React from 'react'
import NovelTable from '../components/novelTable';
import TrendingNovel from '../components/trendingNovel';
import NovelCategoriesSideBar from '../components/novelCategoriesSideBar';
import FinishedNovel from '../components/finishedNovel';
const homePage = () => {
  return (
    <div className="">
        <TrendingNovel/>
        <div className="flex w-10/12 mx-auto gap-5">
        <NovelTable/>
        <NovelCategoriesSideBar/>
        </div>
        <FinishedNovel/>
    </div>
   
  )
}

export default homePage;