import React, { useState, createContext, useContext } from 'react'
import dayTheme from './sharded/dayTheme' // 테마

const Context = createContext()

export const UserProvider = ({ children }) => {
  const [days, setDays] = useState(dayTheme)

  return (
    <Context.Provider value={{ days, setDays }}>{children}</Context.Provider>
  )
}

export const UseUser = () => {
  return useContext(Context)
}
