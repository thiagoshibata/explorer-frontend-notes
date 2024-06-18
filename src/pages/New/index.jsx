import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { Container, Form } from "./styles"
import { Link } from "react-router-dom"

import { api } from "../../services/api"

import { Header } from "../../components/Header"
import { Input } from "../../components/Input"
import { Button } from "../../components/Button"
import { Textarea } from "../../components/Textarea"
import { Section } from "../../components/Section"
import { NoteItem } from "../../components/NoteItem"

export function New() {
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [links, setLinks] = useState([])
  const [newLink, setNewLink] = useState("")

  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState("")

  function handleAddLink() {
    setLinks((prevState) => [...prevState, newLink])
    setNewLink("")
  }
  function handleRemoveLink(linkDeleted) {
    setLinks((prevState) => prevState.filter((link) => link !== linkDeleted))
  }
  function handleAddTag() {
    setTags((prevState) => [...prevState, newTag])
    setNewTag("")
  }
  function handleRemoveTag(tagDeleted) {
    setTags((prevState) => prevState.filter((tag) => tag !== tagDeleted))
  }

  async function handleCreateNote() {
    if (!title) {
      return alert("Preencha o título da nota")
    }
    if (newLink) {
      return alert(
        "Você preencheu o campo de Novo Link mas não clicou em adicionar. Por favor, adicione ou deixe o campo em branco"
      )
    }
    if (newTag) {
      return alert(
        "Você preencheu o campo de Nova Tag mas não clicou em adicionar. Por favor, adicione ou deixe o campo em branco"
      )
    }
    await api.post("/notes", {
      title,
      description,
      tags,
      links,
    })
    alert("Nota criada com sucesso!")
    navigate("/")
  }
  return (
    <Container>
      <Header />
      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <Link to="/">voltar</Link>
          </header>
          <Input
            placeholder="Título"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Observações"
            onChange={(e) => setDescription(e.target.value)}
          />
          <Section title="Links úteis">
            <NoteItem
              isNew
              placeholder="Novo link"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              onClick={handleAddLink}
            />
            {links.map((link, index) => (
              <NoteItem
                key={String(index)}
                value={link}
                onClick={() => handleRemoveLink(link)}
              />
            ))}
          </Section>
          <Section title="Marcadores">
            <div className="tags">
              {tags.map((tag, index) => (
                <NoteItem
                  key={index}
                  value={tag}
                  onClick={() => handleRemoveTag(tag)}
                />
              ))}
              <NoteItem
                isNew
                placeholder="Nova tag"
                onChange={(e) => setNewTag(e.target.value)}
                value={newTag}
                onClick={handleAddTag}
              />
            </div>
          </Section>
          <Button title="Salvar" onClick={handleCreateNote} />
        </Form>
      </main>
    </Container>
  )
}
