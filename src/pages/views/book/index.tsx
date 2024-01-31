import { BooksType } from "@/types/books.type";
import AddBookView from "./addBook";

const BooksView = ({ books }: { books: BooksType[] }) => {
  return (
    <div>
      <AddBookView />
      <div className="flex justify-center mt-20  mx-64 overflow-x-auto">
        <table className="table table-zebra ">
          <thead>
            <tr>
              <th className="border border-slate-600 text-black">Title</th>
              <th className="border border-slate-600 text-black">
                Description
              </th>
              <th className="border border-slate-600 text-black">Image</th>
              <th className="border border-slate-600 text-black">
                Release Year
              </th>
              <th className="border border-slate-600 text-black">Price</th>
              <th className="border border-slate-600 text-black">Total Page</th>
              <th className="border border-slate-600 text-black">Thickness</th>
              <th className="border border-slate-600 text-black">
                Category
              </th>
              <th className="border border-slate-600 text-black">
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
                  {book.category_id}
                </td>
                <td>
                  <div className="mr-0">
                    {/* <UpdateCategoryView category={category} /> */}
                  </div>
                  {/* <DeleteCategoryView category={category} /> */}
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
