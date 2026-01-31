'use client'

import { useState } from 'react'
import { Video, Phone, Mail, Plus, Calendar } from 'lucide-react'
import { ClientNote } from '@/lib/types'
import { formatRelativeTime } from '@/lib/utils'
import { Button, Badge, Textarea, Card, CardHeader, CardTitle, CardContent } from '@/components/ui'

interface ClientNotesProps {
  notes: ClientNote[]
  clientId: string
  onAddNote?: (note: Omit<ClientNote, 'id'>) => void
}

const noteTypeConfig = {
  meeting: {
    icon: Video,
    label: 'Toplantı',
    color: 'bg-blue-100 text-blue-700',
  },
  call: {
    icon: Phone,
    label: 'Telefon',
    color: 'bg-green-100 text-green-700',
  },
  email: {
    icon: Mail,
    label: 'E-posta',
    color: 'bg-amber-100 text-amber-700',
  },
}

export function ClientNotes({ notes, clientId, onAddNote }: ClientNotesProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [newNote, setNewNote] = useState('')
  const [noteType, setNoteType] = useState<'meeting' | 'call' | 'email'>('meeting')

  const handleAddNote = () => {
    if (!newNote.trim()) return

    onAddNote?.({
      clientId,
      date: new Date(),
      content: newNote,
      type: noteType,
    })

    setNewNote('')
    setIsAdding(false)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Toplantı Notları</CardTitle>
        <Button
          size="sm"
          variant="outline"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => setIsAdding(!isAdding)}
        >
          Not Ekle
        </Button>
      </CardHeader>
      <CardContent>
        {/* Add Note Form */}
        {isAdding && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4">
            <div className="flex gap-2">
              {Object.entries(noteTypeConfig).map(([type, config]) => {
                const Icon = config.icon
                return (
                  <button
                    key={type}
                    onClick={() => setNoteType(type as 'meeting' | 'call' | 'email')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      noteType === type
                        ? config.color
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {config.label}
                  </button>
                )
              })}
            </div>
            <Textarea
              placeholder="Not içeriğini yazın..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              rows={3}
            />
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setIsAdding(false)}>
                İptal
              </Button>
              <Button size="sm" onClick={handleAddNote}>
                Kaydet
              </Button>
            </div>
          </div>
        )}

        {/* Notes Timeline */}
        <div className="space-y-1">
          {notes.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Henüz not bulunmuyor</p>
          ) : (
            notes.map((note, index) => {
              const config = noteTypeConfig[note.type]
              const Icon = config.icon
              const isLast = index === notes.length - 1

              return (
                <div key={note.id} className="flex gap-4">
                  {/* Timeline line */}
                  <div className="flex flex-col items-center">
                    <div className={`p-2 rounded-full ${config.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    {!isLast && (
                      <div className="w-0.5 h-full bg-gray-200 my-2" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-6">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={config.color}>{config.label}</Badge>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatRelativeTime(note.date)}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {note.content}
                    </p>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}
