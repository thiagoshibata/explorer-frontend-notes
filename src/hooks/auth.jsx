import { createContext, useContext, useState, useEffect } from "react"

import { api } from "../services/api"

export const AuthContext = createContext({})

function AuthProvider({ children }) {
  const [data, setData] = useState({})

  //função para autenticar e salvar os dados de usuário e token no local Storage.
  async function signIn({ email, password }) {
    try {
      const response = await api.post("/sessions", { email, password })
      const { user, token } = response.data

      const userData = {
        name: user.name,
        email: user.email,
        id: user.id,
        avatar: user.avatar,
      }

      localStorage.setItem("@rocketnotes:token", token)
      localStorage.setItem("@rocketnotes:user", JSON.stringify(userData))
      //armazenando os dados do token no header da aplicação.
      // api.defaults.headers.authorization = `Bearer ${token}` || desatualizado.
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`

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
  async function updateProfile({ user, avatarFile }) {
    try {
      if (avatarFile) {
        const fileUploadForm = new FormData()
        fileUploadForm.append("avatar", avatarFile)

        const response = await api.patch("/users/avatar", fileUploadForm)
        user.avatar = response.data.avatar
      }

      await api.put("/users", user)

      localStorage.setItem("@rocketnotes:user", JSON.stringify(user))

      setData({ user, token: data.token })
      alert("Perfil atualizado")
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message)
      } else {
        alert("Não foi possivel atualizar os dados")
      }
    }
  }

  function signOut() {
    localStorage.removeItem("@rocketnotes:token")
    localStorage.removeItem("@rocketnotes:user")
    setData({})
  }

  useEffect(() => {
    const token = localStorage.getItem("@rocketnotes:token")
    const user = localStorage.getItem("@rocketnotes:user")
    if (token && user) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`
      setData({
        token,
        user: JSON.parse(user),
      })
    }
  }, [])
  return (
    <AuthContext.Provider
      value={{ signIn, signOut, updateProfile, user: data.user }}
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
