import { useState } from "react"

import { Container, Form, Avatar } from "./styles"
import { FiArrowLeft, FiMail, FiLock, FiUser, FiCamera } from "react-icons/fi"
import { Link } from "react-router-dom"

import { useAuth } from "../../hooks/auth"

import { Input } from "../../components/Input"
import { Button } from "../../components/Button"

export function Profile() {
  const { user, updateProfile } = useAuth()

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [passwordOld, setPasswordOld] = useState("")
  const [passwordNew, setPasswordNew] = useState("")

  async function handleUpdate() {
    const user = {
      name,
      email,
      password: passwordNew,
      old_password: passwordOld,
    }
    try {
      
      await updateProfile({ user })
      setPasswordNew("")
      setPasswordOld("")
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <Container>
      <header>
        <Link to="/">
          <FiArrowLeft />
        </Link>
      </header>
      <Form>
        <Avatar>
          <img
            src="https://github.com/thiagoshibata.png"
            alt="Foto do usuário"
          />
          <label htmlFor="avatar">
            <FiCamera />
            <input id="avatar" type="file" />
          </label>
        </Avatar>
        <Input
          icon={FiUser}
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          icon={FiMail}
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          icon={FiLock}
          type="password"
          placeholder="Senha atual"
          onChange={(e) => setPasswordOld(e.target.value)}
        />
        <Input
          icon={FiLock}
          type="password"
          placeholder="Nova senha"
          onChange={(e) => setPasswordNew(e.target.value)}
        />
        <Button title="Salvar" onClick={handleUpdate} />
      </Form>
    </Container>
  )
}
