import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import routes from './routes'
import './App.css'

function App() {

  return (
    <>
      <Header/>
      <main>
          <Routes>
            {
              routes.map((route,index)=>{
                return(
                  <Route key={index} path={route.path} element={route.element}/>
                )
              })
            }
          </Routes>
        </main>
    </>
  )
}

export default App
