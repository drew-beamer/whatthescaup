import './App.css';
import { useState } from 'react';
import Home from './Pages/Home';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';

function App() {

  // github is weird to use with routing, so i'm using a simple workaround
  // only real downside is can't use URLs to link to the non-home pages, but
  // honestly not super important for this application
  const [page, changePage] = useState('home');

  const [mode, setMode] = useState("dark");

  let content;
  
  if (page === 'home') {
    content = <Home/>
  } else {
    content = <div>uh oh! page not found.</div>
  }

  return <ThemeProvider theme={theme(mode)}>
    <CssBaseline/>
    {content}
  </ThemeProvider>
}

export default App;
