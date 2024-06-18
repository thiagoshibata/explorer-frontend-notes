/* eslint-disable no-unused-vars */
import { useState } from "react"

import { Container, Form, Avatar } from "./styles"
import { FiArrowLeft, FiMail, FiLock, FiUser, FiCamera } from "react-icons/fi"
import { Link } from "react-router-dom"

import { useAuth } from "../../hooks/auth"
import { api } from "../../services/api"

import { Input } from "../../components/Input"
import { Button } from "../../components/Button"
import avatarPlaceHolder from "../../assets/avatar_placeholder.svg"

export function Profile() {
  const { user, updateProfile } = useAuth()

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [passwordOld, setPasswordOld] = useState("")
  const [passwordNew, setPasswordNew] = useState("")

  const avatarUrl = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : avatarPlaceHolder
  const [avatar, setAvatar] = useState(avatarUrl)
  const [avatarFile, setAvatarFile] = useState(null)

  async function handleUpdate() {
    const updated = {
      name,
      email,
      password: passwordNew,
      old_password: passwordOld,
    }
    const userUpdated = Object.assign(user, updated)
    try {
      await updateProfile({ user: userUpdated, avatarFile })
      setPasswordNew("")
      setPasswordOld("")
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  function handleChangeAvatar(event) {
    const file = event.target.files[0]
    setAvatarFile(file)

    const imgPreview = URL.createObjectURL(file)
    setAvatar(imgPreview)
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
          <img src={avatar} alt="Foto do usuário" />
          <label htmlFor="avatar">
            <FiCamera />
            <input id="avatar" type="file" onChange={handleChangeAvatar} />
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
