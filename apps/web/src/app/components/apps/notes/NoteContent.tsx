"use client";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import { TbCheck } from "react-icons/tb";

const noteColorStyles: Record<string, string> = {
  warning: "border-warning/40 bg-warning-soft text-foreground",
  primary: "border-interactive/30 bg-secondary text-interactive",
  error: "border-destructive/30 bg-destructive-soft text-destructive",
  success: "border-success/30 bg-success-soft text-success",
  secondary: "border-chart-3/30 bg-chart-3/10 text-chart-3",
};

interface colorsType {
  lineColor: string;
  disp: string | any;
  id: any;
}

interface Note {
  id: any;
  title: string;
  content?: string;
  color: string;
}

interface NoteContentProps {
  note: any | any;
  updateNote: (id: any, title: string, color: string) => void;
}

const NoteContent: React.FC<NoteContentProps> = ({ note, updateNote }) => {
  const [initialTitle, setInitialTitle] = useState("");
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (note) {
      setInitialTitle(note.title);
      setUpdatedTitle(note.title);
    }
  }, [note]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedTitle(e.target.value);
    setIsEditing(true);
  };

  const handleColorChange = (color: string) => {
    if (!note) return;
    const titleToUse = isEditing ? updatedTitle : initialTitle;
    updateNote(note.id, titleToUse, color);
  };

  const handleBlur = () => {
    if (!note) return;
    setIsEditing(false);
    updateNote(note.id, updatedTitle, note.color);
  };

  const colorvariation: colorsType[] = [
    { id: 1, lineColor: "warning", disp: "warning" },
    { id: 2, lineColor: "primary", disp: "primary" },
    { id: 3, lineColor: "error", disp: "error" },
    { id: 4, lineColor: "success", disp: "success" },
    { id: 5, lineColor: "secondary", disp: "secondary" },
  ];

  if (!note) {
    return (
      <div className="text-center w-full py-6 text-2xl text-muted-foreground">
        Select a Note
      </div>
    );
  }

  return (
    <div className="flex flex-grow p-6">
      <div className="w-full">
        <label htmlFor="outlined-multiline-static" className="sr-only">
          Note content
        </label>
        <Textarea
          id="outlined-multiline-static"
          placeholder="Edit Note"
          rows={5}
          value={isEditing ? updatedTitle : initialTitle}
          onChange={handleTitleChange}
          className="w-full p-6 form-control-textarea"
          onBlur={handleBlur}
        />
        <br />
        <h6 className="text-base mb-3">Change Note Color</h6>
        <div className="flex gap-2 items-center">
          {colorvariation.map((color1) => (
            <button
              type="button"
              className={`h-11 w-11 flex justify-center items-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${noteColorStyles[color1.disp] || "border-border bg-muted text-muted-foreground"}`}
              key={color1.id}
              onClick={() => handleColorChange(color1.disp)}
              aria-label={`Select ${color1.disp} note color`}
              aria-pressed={note.color === color1.disp}
            >
              {note.color === color1.disp ? (
                <TbCheck width="18" aria-hidden="true" />
              ) : null}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteContent;
