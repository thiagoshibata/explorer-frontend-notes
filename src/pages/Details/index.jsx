import { Container, Links, Content } from "./style.js"
import { Header } from "../../components/Header"
import { Button } from "./../../components/Button"
import { Section } from "./../../components/Section"
import { Tag } from "./../../components/Tag"
import { ButtonText } from "./../../components/ButtonText"

export function Details() {
  return (
    <Container>
      <Header />
      <main>
        <Content>
          <ButtonText title="Excluir nota" />
          <h1>Introdução ao React</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis
            vero provident consectetur, et nisi quidem ea aliquid adipisci
            blanditiis dolores iusto ex, officia laborum nostrum est. Soluta
            inventore praesentium eius? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Culpa facere modi eaque tempora omnis tempore?
            Neque laborum dicta esse rem hic repudiandae quos quidem non? Quia
            exercitationem fuga placeat hic. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Cumque nulla provident eum nesciunt
            vel aliquid vitae eos maxime iure facere porro asperiores dolores
            pariatur nihil, delectus, sit, sint iste ipsam.
          </p>
          <Section title="Links úteis">
            <Links>
              <li>
                <a href="#">https://rocketseat.com.br</a>
              </li>
              <li>
                <a href="#">https://rocketseat.com.br</a>
              </li>
            </Links>
          </Section>
          <Section title="Marcadores">
            <Tag title="nodejs" />
            <Tag title="express" />
          </Section>
          <Button title="Voltar" />
        </Content>
      </main>
    </Container>
  )
}
