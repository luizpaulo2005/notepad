type GetNotesResponse = {
  error:
    | string
    | {
        id: string;
        title: string;
        content: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
      }[];
};

const getNotes = async (): Promise<GetNotesResponse> => {
  const response = await fetch("/api/note");
  const data = await response.json();

  return data;
};

export { getNotes };
