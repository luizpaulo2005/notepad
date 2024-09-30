import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ptBR from "dayjs/locale/pt-br";
import { DeleteNote } from "./delete-note";
import { UpdateNote } from "./update-note";

dayjs.extend(relativeTime);
dayjs.locale(ptBR);

interface NoteProps {
  id: string
  title: string;
  content: string;
  userId: string;
  createdAt: Date;
}

const Note = ({ id, title, content, createdAt }: NoteProps) => {
  return (
    <div className="min-w-64 max-w-96 max-h-[400px] flex flex-col gap-4">
      <div className="bg-zinc-300 dark:bg-zinc-800 h-56 p-4 rounded-lg shadow-md flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm dark:text-gray-500 overflow-hidden break-words line-clamp-6">
            {content}
          </p>
        </div>
        <div className="flex items-center justify-between gap-2">
        <p className="text-xs dark:text-gray-400">
          Criado {dayjs().to(createdAt)}
        </p>
        <div className="flex items-center gap-2">
          <UpdateNote />
          <DeleteNote id={id} />
        </div>
        </div>
      </div>
    </div>
  );
};

export { Note };
