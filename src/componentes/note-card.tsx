import * as Dialog from '@radix-ui/react-dialog'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { X } from 'lucide-react'

interface NoteCardProps {
    note: {
        id: string;
        date: Date;
        content: string;
    };
    deleterNota: (id:string) => void
}

export function NoteCard({note , deleterNota}: NoteCardProps) {
    return (
        <Dialog.Root>
            <Dialog.Trigger className='text-left flex flex-col rounded-md bg-slate-800 p-5 gap-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none'>
                <span className='text-sm font-medium text-slate-300'>
                    {formatDistanceToNow(note.date, {locale: ptBR , addSuffix: true })}
                </span>
                <p className='text-sm leading-6 text-slate-400'>
                    {note.content}
                </p>

                <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent pointer-events-none'/>

            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className='inset-0 fixed bg-black/60'/>
                <Dialog.Content className='fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:top-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none'> 
                    
                    <Dialog.Close className='absolute top-0 right-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100'>
                        <X className='size-5' />
                    </Dialog.Close>

                    <div className='flex flex-1 flex-col gap-3 p-5'>
                        <span className='text-sm font-medium text-slate-300'>
                            {formatDistanceToNow(note.date, {locale: ptBR , addSuffix: true})}
                        </span>
                        <p className='text-sm leading-6 text-slate-400'>
                        </p>

                        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent pointer-events-none'/>
                    </div>

                    <button 
                        type="button" 
                        onClick={() => deleterNota(note.id)} // como nao estamos executando uma chamada de função, devemos utilizar essa array function para nao dar erro.
                        className='group text-center text-sm text-slate-300 outline-none py-4 w-full bg-slate-800 font-medium'
                    >
                        Deseja  <span className='text-red-400 hover:underline group-hover:underline'> apagar essa nota? </span>
                    
                    </button>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}