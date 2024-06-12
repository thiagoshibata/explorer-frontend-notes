import { createContext, useContext, useState, useEffect } from "react"

import { api } from "../services/api"

export const AuthContext = createContext({})

function AuthProvider({ children }) {
  const [data, setData] = useState({})

  async function signIn({ email, password }) {
    try {
      const response = await api.post("/sessions", { email, password })
      const { user, token } = response.data

      localStorage.setItem("@rocketnotes:token", token)
      localStorage.setItem("@rocketnotes:user", JSON.stringify(user))
      //armazenando os dados do token no header da aplicação.
      api.defaults.headers.authorization = `Bearer ${token}`

      //armazenando dados no estado da aplicação
      setData({ user, token })
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message)
      } else {
        alert("Não foi possivel autenticar")
      }
    }
  }
  useEffect(() => {
    const token = localStorage.getItem("@rocketnotes:token")
    const user = localStorage.getItem("@rocketnotes:user")
    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`
      setData({
        token,
        user: JSON.parse(user),
      })
    }
  }, [])
  return (
    <AuthContext.Provider value={{ signIn, user: data.user }}>
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
