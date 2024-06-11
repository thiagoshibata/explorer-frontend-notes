import { createContext, useContext } from "react"

export const AuthContext = createContext({})

function AuthProvider({ children }) {
  return (
    <AuthContext.Provider
      value={{ name: "Thiago", email: "thiago@gmail.com " }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth }
