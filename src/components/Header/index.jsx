import { RiShutDownLine } from "react-icons/ri"
import { Container, Profile, Logout } from "./styles"

export function Header() {
  return (
    <Container>
      <Profile>
        <img src="https://github.com/thiagoshibata.png" alt="foto do usuário" />
        <div>
          <span>Bem-vindo</span>
          <strong>Thiago Shibata</strong>
        </div>
      </Profile>
      <Logout>
        <RiShutDownLine />
      </Logout>
    </Container>
  )
}
