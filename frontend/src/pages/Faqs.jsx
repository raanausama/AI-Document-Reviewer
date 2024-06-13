import React from 'react'
import ResponsiveAppBar from '../navbar/NavBar'
import CommonQuestions from '../questions'

const Faqs = () => {
    const repo = 'faqs';
  return (
    <>
    <ResponsiveAppBar/>
    <CommonQuestions repo={repo}/>
    </>
  )
}

export default Faqs