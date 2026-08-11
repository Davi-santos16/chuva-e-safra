"use client";

import { Icon } from "@iconify/react";
import React, { useState, useEffect } from "react";
import { NotesType } from "@/app/(DashboardLayout)/types/apps/notes";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";

const noteColorStyles: Record<string, string> = {
  warning: "border-warning/30 bg-warning-soft text-foreground",
  primary: "border-interactive/20 bg-secondary text-interactive",
  error: "border-destructive/20 bg-destructive-soft text-destructive",
  success: "border-success/20 bg-success-soft text-success",
  secondary: "border-chart-3/20 bg-chart-3/10 text-chart-3",
};

interface NotelistProps {
  notes: NotesType[];
  loading: boolean;
  onSelectNote: (noteId: string) => void;
  onDeleteNote: (noteId: string) => void;
}

const Notelist: React.FC<NotelistProps> = ({ notes, loading, onSelectNote, onDeleteNote }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

  useEffect(() => {
    if (notes.length > 0) {
      const firstNoteId = notes[0].id;
      setActiveNoteId(String(firstNoteId));
    }
  }, [notes]);

  const filterNotes = (notes: NotesType[], nSearch: string) => {
    if (nSearch !== "")
      return notes.filter(
        (t: any) =>
          !t.deleted &&
          t.title.toLowerCase().includes(nSearch.toLowerCase())
      );

    return notes?.filter((t: any) => !t.deleted);
  };

  const filteredNotes = filterNotes(Array.isArray(notes) ? notes : [], searchTerm);

  const handleNoteClick = (noteId: string) => {
    setActiveNoteId(noteId);
    onSelectNote(noteId);
  };

  if (loading) {
    return <p>Loading notes...</p>;
  }

  return (
    <div>
      <Input
        type="text"
        placeholder="Search Notes"
        aria-label="Search notes"
        value={searchTerm}
        onChange={(e: any) => setSearchTerm(e.target.value)}
        className="w-full"
      />
      <h6 className="text-base mt-6">All Notes</h6>
      <div className="flex flex-col gap-3 mt-4">
        {filteredNotes && filteredNotes.length ? (
          filteredNotes.map((note: any) => (
            <div key={note.id}>
              <div
                className={`relative rounded-lg border ${noteColorStyles[note.color] || "border-border bg-muted text-foreground"}
                ${String(activeNoteId) === String(note.id) ? "scale-100 ring-2 ring-current/20" : "scale-95"} transition-transform duration-200 motion-reduce:transition-none motion-reduce:transform-none`}
              >
                <button
                  type="button"
                  className="block min-h-11 w-full rounded-lg p-4 pr-16 text-left text-inherit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  onClick={() => handleNoteClick(note.id)}
                  aria-pressed={String(activeNoteId) === String(note.id)}
                >
                  <h6 className="truncate text-base text-inherit">
                    {note.title}
                  </h6>
                  <p className="text-xs text-muted-foreground tabular-nums">
                    {new Date(note.datef).toLocaleDateString()}
                  </p>
                </button>
                  <div className="absolute bottom-2 right-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDeleteNote(note.id)}
                          className="hover:bg-destructive/10 hover:text-destructive"
                          aria-label="Delete note"
                        >
                          <Icon icon="tabler:trash" height={18} aria-hidden="true" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Delete</TooltipContent>
                    </Tooltip>
                  </div>
              </div>
            </div>
          ))
        ) : (
          <Alert variant="destructive">
            <AlertTitle>No Notes Found!</AlertTitle>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default Notelist;
