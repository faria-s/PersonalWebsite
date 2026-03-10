import Link from "next/link";

const notes = [
  { name: "[BD] Base de Dados", source: "notes/BD" },
  { name: "[POO] Programação Orientada a Objetos", source: "notes/POO" },
  { name: "[RC] Redes de Computadores", source: "notes/RC" },
  { name: "[SO] Sistemas Operativos", source: "notes/SO" },
  { name: "[SD] Sistemas Distribuídos", source: "notes/SD" },
  { name: "[CC] Comunicação por Computadores", source: "notes/CC" },
];

export default function CollegeNotes() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-8">
      <h2 className="p-4">Notes</h2>
      <div className="flex flex-col gap-y-3 w-full max-w-lg">
        {notes.map((subject, index) => {
          return (
            <div
              key={index}
              className="border-white border w-full p-3 rounded-lg text-white"
            >
              <Link
                href={`/collegeNotes/${subject.source}`}
                className="hover:text-highlight"
              >
                {subject.name}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
