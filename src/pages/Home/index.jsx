import { useState, useEffect } from "react"
import { FiPlus, FiSearch } from "react-icons/fi"

import { Container, Brand, Menu, Search, Content, NewNote } from "./styles"
import { Header } from "../../components/Header"
import { Section } from "../../components/Section"
import { Note } from "../../components/Note"

import { api } from "../../services/api"

import { Input } from "../../components/Input"
import { ButtonText } from "../../components/ButtonText"

export function Home() {
  const [tags, setTags] = useState([])
  const [tagsSelected, setTagsSelected] = useState([])

  function handleTagSelected(tagName) {
    const alreadySelected = tagsSelected.includes(tagName)
    if (alreadySelected) {
      const filteredTags = tagsSelected.filter((tag) => tag !== tagName)
      setTagsSelected(filteredTags)
    } else {
      setTagsSelected((prevState) => [...prevState, tagName])
    }
    console.log(tagsSelected)
  }

  useEffect(() => {
    async function fetchTags() {
      const response = await api.get("/tags")

      setTags(response.data)
    }

    fetchTags()
  }, [])

  return (
    <Container>
      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>
      <Header />
      <Menu>
        <li>
          <ButtonText
            isActive={tagsSelected.length === 0}
            title="Todos"
            onClick={() => handleTagSelected("all")}
          />
        </li>
        {tags &&
          tags.map((tag) => (
            <li key={tag.id}>
              <ButtonText
                title={tag.name}
                onClick={() => handleTagSelected(tag.name)}
                isActive={tagsSelected.includes(tag.name)}
              />
            </li>
          ))}
      </Menu>
      <Search>
        <Input icon={FiSearch} placeholder="Pesquise pelo título" />
      </Search>
      <Content>
        <Section title="Minhas notas">
          <Note
            data={{
              title: "React",
              tags: [
                { id: "1", name: "react" },
                { id: "2", name: "nodejs" },
              ],
            }}
          />
          <Note
            data={{
              title: "React",
              tags: [
                { id: "1", name: "react" },
                { id: "2", name: "nodejs" },
              ],
            }}
          />
          <Note
            data={{
              title: "React",
              tags: [
                { id: "1", name: "react" },
                { id: "2", name: "nodejs" },
              ],
            }}
          />
        </Section>
      </Content>
      <NewNote to="/new">
        <FiPlus />
        Criar nota
      </NewNote>
    </Container>
  )
}
