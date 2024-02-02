import { useBook } from "@/store/book/crudBook";
import { BooksType } from "@/types/books.type";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteBookView = ({ book }: { book: BooksType }) => {
  const {deleteData} = useBook();
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();

  const handleDelete = async (bookId: number) => {
    setIsMutating(true);
    await deleteData(bookId);
    setIsMutating(false);
    router.refresh();
    setModal(false);
  };
  function handleChange() {
    setModal(!modal);
  }
  return (
    <div>
      <button className="btn" onClick={handleChange}>
      <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="#000000"
          viewBox="0 0 256 256"
        >
          <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
        </svg>
      </button>
      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />
      <dialog id="modal" className="modal">
        <div className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleChange}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg">Do you want to delete?</h3>
          <div className="flex items-center justify-between mt-3">
            {!isMutating ? (
              <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => handleDelete(book.id)}
            >
              Delete
            </button>
            ) : (
              <button type="button" className="btn loading">
                Deleting...
              </button>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default DeleteBookView;
