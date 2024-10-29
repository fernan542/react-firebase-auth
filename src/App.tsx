import './App.css'
import { HomePage } from './features/home/views/home_page';
import { LoginPage } from './features/login/views/login_page';
import { AppStatus, useApp } from './stores/useApp';
import { auth } from './firebase_options';
import { useEffect } from 'react';

function App() {
  const appState = useApp()

  useEffect(() => {
    auth.onAuthStateChanged(appState.update)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  switch (appState.status) {
    case AppStatus.authenticating:
      return <h1>Loading ...</h1>
    case AppStatus.unauthenticated:
      return <LoginPage />
    case AppStatus.authenticated:
      return <HomePage />
    default:
      break;
  }
}

export default App
