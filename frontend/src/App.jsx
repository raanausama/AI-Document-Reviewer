import { useEffect, forwardRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import clearCache from './utils/clearCache';
import { clearUser } from './redux/user';

import './App.css'
import Router from './routes'

function App() {
  return (
    <Router/>
  )
}

export default App
