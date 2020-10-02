import getNoteById from "./handler/getNoteById";
import listNotes from "./handler/listNotes";
import createNote from "./handler/createNote";
import deleteNote from "./handler/deleteNote";
import updateNote from "./handler/updateNote";
import { Note } from "./models/Note";

type AppSyncEvent = {
  info: {
    fieldName: string;
  };

  arguments: {
    id: string;
    note: Note;
  };
};

exports.handler = async (event: AppSyncEvent) => {
  switch (event.info.fieldName) {
    case "getNoteById":
      return await getNoteById(event.arguments.id);
    case "createNote":
      return await createNote(event.arguments.note);
    case "listNotes":
      return await listNotes();
    case "deleteNote":
      return await deleteNote(event.arguments.id);
    case "updateNote":
      return await updateNote(event.arguments.note);
    default:
      return null;
  }
};
