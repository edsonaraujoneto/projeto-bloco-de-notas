import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'


export function NewNoteCard() {
  const [mostrarParagrafo, setMostrarParagrafo] = useState(true)
  const [conteudo, setConteudo] = useState('')

  function handleMostrarParagrafo () {
    setMostrarParagrafo(false)
  }

  function handleDigitou (event: ChangeEvent<HTMLTextAreaElement>) {
    setConteudo(event.target.value)
    
    if (event.target.value === '') {
      setMostrarParagrafo(true)
    }
  }

  function handleSalvouNota(event: FormEvent) {
    event.preventDefault()
    console.log(conteudo)

    toast.success('Nota salva com sucesso')
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
        <Dialog.Content className='fixed overflow-hidden left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none'> 
            
        <Dialog.Close className='absolute top-0 right-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100'>
          <X className='size-5' />
        </Dialog.Close>

        <form onSubmit={handleSalvouNota} className='flex-1 flex-col flex'>
          <div className='flex flex-1 flex-col gap-3 p-5'>
            <span className='text-sm font-medium text-slate-300'>
              Adicionar Nota
            </span>
            {mostrarParagrafo ? (
              <p className='text-sm leading-6 text-slate-400'>
                Comece <button className='font-medium text-lime-400 hover:underline'>gravando uma nota</button> em áudio ou se preferir <button className='font-medium text-lime-400 hover:underline' onClick={handleMostrarParagrafo}>utilize apenas textos.</button>
              </p>
            ) : ( 
              <textarea 
                autoFocus
                className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none' 
                onChange={handleDigitou}
              />
            )}

            <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent pointer-events-none'/>
          </div>

          <button type="submit" className='text-center text-sm text-lime-950 outline-none py-4 w-full bg-lime-400 font-medium hover:bg-lime-500'>
            Salvar Nota
          </button>
        </form>
        </Dialog.Content>
    </Dialog.Portal>


    </Dialog.Root>
  )
}