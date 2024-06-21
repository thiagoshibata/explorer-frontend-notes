import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

import { Container, Links, Content } from "./style.js"

import { api } from "../../services/api.js"

import { Header } from "../../components/Header"
import { Button } from "./../../components/Button"
import { Section } from "./../../components/Section"
import { Tag } from "./../../components/Tag"
import { ButtonText } from "./../../components/ButtonText"

export function Details() {
  const params = useParams()
  const [data, setData] = useState("")
  const navigate = useNavigate()

  function handleBack() {
    navigate("/")
  }

  async function handleRemoveNote() {
    const confirm = window.confirm("Deseja realmente excluir essa nota?")

    if (confirm) {
      await api.delete(`/notes/${params.id}`)
      navigate("/")
    }
  }

  useEffect(() => {
    async function fetchNote() {
      const response = await api.get(`/notes/${params.id}`)
      setData(response.data)
    }

    fetchNote()
  }, [])
  return (
    <Container>
      <Header />
      {data && (
        <main>
          <Content>
            <ButtonText title="Excluir nota" onClick={handleRemoveNote} />
            <h1>{data.title}</h1>
            <p>{data.description}</p>

            {data.links && (
              <Section title="Links úteis">
                <Links>
                  {data.links.map((link) => (
                    <li key={String(link.id)}>
                      <a href={link.url} target="_blank">
                        {link.url}
                      </a>
                    </li>
                  ))}
                </Links>
              </Section>
            )}

            {data.tags && (
              <Section title="Marcadores">
                {data.tags.map((tag) => (
                  <Tag key={tag.id} title={tag.name} />
                ))}
              </Section>
            )}
            <Button onClick={handleBack} title="Voltar" />
          </Content>
        </main>
      )}
    </Container>
  )
}
