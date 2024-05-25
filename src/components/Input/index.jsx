import { Container } from "./styles"

export function Input({ icon: Icon, ...rest }) {
  return (
    <Container>
      {/* somente mostrará o ícone caso ele exista */}
      {Icon && <Icon size={20} />}
      <input {...rest} />
    </Container>
  )
}
