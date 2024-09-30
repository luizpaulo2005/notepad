import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ptBR from "dayjs/locale/pt-br";

dayjs.extend(relativeTime);
dayjs.locale(ptBR);

interface NoteProps {
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

const Note = ({ title, content, createdAt }: NoteProps) => {
  return (
    <div className="min-w-64 max-w-96 max-h-96 flex flex-col gap-4">
      <div className="bg-zinc-300 dark:bg-zinc-800 h-48 p-4 rounded-lg shadow-md flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm dark:text-gray-500 overflow-hidden break-words line-clamp-6">
            {content}
          </p>
        </div>
        <p className="text-xs dark:text-gray-400">
          Criado {dayjs().to(createdAt)}
        </p>
      </div>
    </div>
  );
};

export { Note };
