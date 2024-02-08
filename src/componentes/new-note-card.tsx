import * as Dialog from '@radix-ui/react-dialog' // biblioteca de modals
import { X } from 'lucide-react' // biblioteca de icones
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner' // biblioteca de avisos

interface NewNoteCardProps {
  NotaCriada: (content: string) => void,
}

let speechRecognition: SpeechRecognition | null = null 

export function NewNoteCard({ NotaCriada }: NewNoteCardProps) {
  const [mostrarParagrafo, setMostrarParagrafo] = useState(true) // paragrafo de adicionar nota
  const [conteudo, setConteudo] = useState('') // conteudo digitado pelo usuario
  const [gravandoAudio, setGravandoAudio] = useState(false)

  function handleEsconderParagrafo () {
    setMostrarParagrafo(false)
  }

  function handleDigitou (event: ChangeEvent<HTMLTextAreaElement>) {
    setConteudo(event.target.value)
    
    if (event.target.value === '') {
      setMostrarParagrafo(true)
    }
  }

  function handleSalvouNota(event: FormEvent) {
    event.preventDefault() // previne o comportamento padrao de envio de formulario

    if(conteudo === '') {
      toast.warning('Nota vazia')
      return
    }
    toast.success('Nota salva com sucesso') // aviso de sucesso

    setConteudo('')
    setMostrarParagrafo(true)
    NotaCriada(conteudo)
  }

  function handleComecouGravarAudio () {
    const speechRecordingAPIDisponivel = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window

    if (!speechRecordingAPIDisponivel) {
      alert('Infelizmente seu navegador não é compatível')
      return
    }

    setGravandoAudio(true)
    setMostrarParagrafo(false)

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

    speechRecognition = new SpeechRecognitionAPI()

    speechRecognition.lang = 'pt-BR' // linguagem escolhida
    speechRecognition.continuous = true // grava ate pedir para parar de gravar
    speechRecognition.maxAlternatives = 1 // o speech só vai retornar uma alternativa de palavras dificeis nao compreendidas
    speechRecognition.interimResults = true // vai trazendo os resultados conforme for falando

    speechRecognition.onresult = (event) => { // funcao que vai ser chamada toda vez que a API ouvir algo
      const texto = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '') // reduce é um metodo que pega todo o array e criar uma unica informação

      setConteudo(texto)
    }

    speechRecognition.onerror = (event) => {
      console.error(event)
    }

    speechRecognition.start()


  }

  function handleParouGravarAudio () {
    setGravandoAudio(false)

    if (speechRecognition != null) {
      speechRecognition.stop()
    }
  }

  return (
    <Dialog.Root>
        
      <Dialog.Trigger className='text-left flex flex-col rounded-md bg-slate-700 p-5 gap-3 overflow-hidden relative hover:ring-2 hover:ring-slate-500 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none'> 
        <span className='text-sm font-medium text-slate-200'>
          Adicionar Nota
        </span>
        <p className='text-sm leading-6 text-slate-400'>
          Grave uma nota em áudio que será convertida para texto automaticamente.
        </p>
      </Dialog.Trigger>
        
      <Dialog.Portal>
        <Dialog.Overlay className='inset-0 fixed bg-black/60'/>
        <Dialog.Content className='fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:top-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none'> 
            
        <Dialog.Close className='absolute top-0 right-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100'>
          <X className='size-5' />
        </Dialog.Close>

        <form className='flex-1 flex-col flex'>
          <div className='flex flex-1 flex-col gap-3 p-5'>
            <span className='text-sm font-medium text-slate-300'>
              Adicionar Nota
            </span>

            {mostrarParagrafo ? (
              <p className='text-sm leading-6 text-slate-400'>
                Comece <button type='button' className='font-medium text-lime-400 hover:underline' onClick={handleComecouGravarAudio}>gravando uma nota</button> em áudio ou se preferir <button type='button' className='font-medium text-lime-400 hover:underline' onClick={handleEsconderParagrafo}>utilize apenas textos.</button>
              </p>
            ) : ( 
              <textarea 
                autoFocus
                className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none' 
                onChange={handleDigitou}
                value={conteudo}
              />
            )}

            <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent pointer-events-none'/>
          </div>

          {gravandoAudio ? (
            <button 
              type="button" 
              onClick={handleParouGravarAudio} 
              className='text-center flex items-center justify-center gap-2 text-sm text-slate-300 outline-none py-4 w-full bg-slate-900 font-medium hover:text-slate-100'
            >
              <div className='size-3 rounded-full bg-red-500 animate-pulse'/>
              Gravando! (Clique para interromper)
            
            </button> )
          : (
            <button 
              type="button" 
              onClick={handleSalvouNota}
              className='text-center text-sm text-lime-950 outline-none py-4 w-full bg-lime-400 font-medium hover:bg-lime-500'
            >

              Salvar Nota

            </button>
          )}

        </form>
        </Dialog.Content>
    </Dialog.Portal>

    </Dialog.Root>
  )
}