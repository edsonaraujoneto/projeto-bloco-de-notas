import { ChangeEvent, useState } from 'react'
import logo from './assets/logo.svg'
import { NewNoteCard } from './componentes/new-note-card'
import { NoteCard } from './componentes/note-card'

interface Note {
  id: string,
  date: Date,
  content: string
}

export function App() {

  const [pesquisa, setPesquisa] = useState('')
  const [notas, setNotas] = useState<Note[]>( () => {
    const notasJaSalvasAnteriormente = localStorage.getItem('notas')

    if (notasJaSalvasAnteriormente) {
      return JSON.parse(notasJaSalvasAnteriormente)
    }

    return []
  }) // Informamos o conteudo de notas com <Note[]>

  function NotaCriada (content: string) {
    const novaNota = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }

    const notasArray = [novaNota,...notas]
    setNotas(notasArray)

    localStorage.setItem('notas', JSON.stringify(notasArray))
  }

  function deleterNota (id: string) {
    const arrayNotas = notas.filter(nota => {
       return nota.id != id
    })

    setNotas(arrayNotas)
    localStorage.setItem('notas', JSON.stringify(arrayNotas))


  }

  function handlePesquisando(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value 
    setPesquisa(query)
  }

  const filtrarNotas = pesquisa != '' ? notas.filter(note => note.content.toLocaleLowerCase().includes(pesquisa.toLocaleLowerCase())) : notas  

  return  (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5 ">
      
      <img src ={logo} alt="NLW Expert" />

      <form className='w-full'>
          <input 
            type="text" 
            placeholder='Busque suas notas...' 
            className='w-full bg-transparent text-3xl font-semibold tracking-tighter outline-none placeholder: text-slate-500'  
            onChange={handlePesquisando}
          />
      </form>

      <div className='h-px bg-slate-700' />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] gap-6'>

        <NewNoteCard  NotaCriada = {NotaCriada} />
        {filtrarNotas.map ( nota => {
          return <NoteCard key={nota.id} note = {nota} deleterNota = {deleterNota}/>
        })}

      </div>

    </div>
  )
}



