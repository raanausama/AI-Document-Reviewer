import React from 'react'
import ResponsiveAppBar from '../navbar/NavBar'
import CommonQuestions from '../questions'

const Faqs = ({token}) => {
    const repo = 'faqs';
  return (
    <>
    <ResponsiveAppBar token={token}/>
    <CommonQuestions repo={repo}/>
    </>
  )
}

export default Faqs