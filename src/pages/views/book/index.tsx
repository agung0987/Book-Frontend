import { BooksType } from "@/types/books.type";
import AddBookView from "./addBook";
import UpdateBookView from "./updateBook";
import DeleteBookView from "./deleteBook";
import { useEffect } from "react";
import { useBook } from "@/store/book/crudBook";

const BooksView = () => {
  const { books, fetchData } = useBook();
  useEffect(() => {
    const fetchDataFromApi = async () => {
      await fetchData();
    };
    fetchDataFromApi();
  }, []);
  return (
    <div>
      <div className="flex justify-end mt-20 mx-44 overflow-x-auto">
      <AddBookView />
      </div>
      <div className="flex justify-center mt-1  mx-44 overflow-x-auto">
        <table className="table table-zebra ">
          <thead>
            <tr>
              <th className="border border-slate-600 bg-sky-100  text-black text-base">Title</th>
              <th className="border border-slate-600 bg-sky-100  text-black text-base">
                Description
              </th>
              <th className="border border-slate-600 bg-sky-100  text-black text-base">Image</th>
              <th className="border border-slate-600 bg-sky-100  text-black text-base">
                Release Year
              </th>
              <th className="border border-slate-600 bg-sky-100  text-black text-base">Price</th>
              <th className="border border-slate-600 bg-sky-100  text-black text-base">Total Page</th>
              <th className="border border-slate-600 bg-sky-100  text-black text-base">Thickness</th>
              <th className="border border-slate-600 bg-sky-100  text-black text-base">
                Category
              </th>
              <th className="border border-slate-600 bg-sky-100  text-black text-base">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {books.map((book: BooksType, i: number) => (
              <tr key={i} className="border border-slate-700">
                <td className="border border-slate-700 text-black">
                  {book.title}
                </td>
                <td className="border border-slate-700 text-black">
                  {book.description}
                </td>
                <td className="border border-slate-700 text-black">
                  {book.image_url}
                </td>
                <td className="border border-slate-700 text-black">
                  {book.release_year}
                </td>
                <td className="border border-slate-700 text-black">
                  {book.price}
                </td>
                <td className="border border-slate-700 text-black">
                  {book.total_page}
                </td>
                <td className="border border-slate-700 text-black">
                  {book.thickness}
                </td>
                <td className="border border-slate-700 text-black">
                  {book.category.name}
                </td>
                <td className="flex space-x-2">
                  <div className="flex">
                    <UpdateBookView book={book}/>
                  </div>
                  <div className="flex">
                  <DeleteBookView book={book}/>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BooksView;
