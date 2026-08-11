'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { TbCheck } from 'react-icons/tb'

const noteColorStyles: Record<string, string> = {
  warning: 'border-warning/40 bg-warning-soft text-foreground',
  primary: 'border-interactive/30 bg-secondary text-interactive',
  error: 'border-destructive/30 bg-destructive-soft text-destructive',
  success: 'border-success/30 bg-success-soft text-success',
  secondary: 'border-chart-3/30 bg-chart-3/10 text-chart-3',
}

interface Props {
  colors: any[]
  addNote: (note: { title: string; color: string }) => void
}

const AddNotes = ({ colors, addNote }: Props) => {
  const [openNoteModal, setOpenNoteModal] = useState(false)
  const [scolor, setScolor] = useState<string>('primary')
  const [title, setTitle] = useState('')

  const setColor = (e: string) => setScolor(e)

  const handleSave = () => {
    addNote({ title, color: scolor })
    setOpenNoteModal(false)
    setTitle('')
  }

  return (
    <>
      <Dialog open={openNoteModal} onOpenChange={setOpenNoteModal}>
        <DialogTrigger asChild>
          <Button className='rounded-md'>Add Note</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-lg'>
          <DialogHeader>
            <DialogTitle>Add New Note</DialogTitle>
          </DialogHeader>

          <div className='space-y-2'>
            <label htmlFor='new-note-content' className='sr-only'>
              Note content
            </label>
            <Textarea
              id='new-note-content'
              rows={5}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='w-full'
              placeholder='Write your note here...'
            />
            <h6 className='text-base pt-4'>Change Note Color</h6>
            <div className='flex gap-2 items-center'>
              {colors?.map((color) => (
                <button
                  type='button'
                  key={color.disp}
                  onClick={() => setColor(color.disp)}
                  className={`h-11 w-11 flex justify-center items-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${noteColorStyles[color.disp] || 'border-border bg-muted text-muted-foreground'}`}
                  aria-label={`Select ${color.disp} note color`}
                  aria-pressed={scolor === color.disp}>
                  {scolor === color.disp && (
                    <TbCheck size={18} aria-hidden='true' />
                  )}
                </button>
              ))}
            </div>
          </div>

          <DialogFooter className='pt-4'>
            <Button
              disabled={!title}
              onClick={handleSave}
              className='rounded-md'>
              Save
            </Button>
            <Button
              variant='outline'
              className='rounded-md'
              onClick={() => setOpenNoteModal(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddNotes
