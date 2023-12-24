import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import routes from './routes'
import './App.css'

function App() {

  return (
    <>
      <main>
          <Routes>
            {
              routes.map((route,index)=>{
                return(
                  <Route key={index} path={route.path} element={route.element} exact={route.exact as boolean}/>
                )
              })
            }
          </Routes>
        </main>
    </>
  )
}

export default App
