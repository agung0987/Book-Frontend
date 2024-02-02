import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CategoryType } from "@/types/category.type";
import { BooksType } from "@/types/books.type";
import { useBook } from "@/store/book/crudBook";
import { useCategories } from "@/store/categorys/crud";

const UpdateBookView = ({ book }: { book: BooksType }) => {
  const [title, setTitle] = useState(book.title);
  const [description, setDescription] = useState(book.description);
  const [image, setImage] = useState(book.image_url);
  const [year, setYear] = useState(book.release_year || '' );
  const [price, setPrice] = useState(book.price);
  const [totalPage, setTotalPage] = useState(book.total_page ||'');
  const [modal, setModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  const [isMutating, setIsMutating] = useState(false);
  const { updateData } = useBook();
  const { categories, fetchData } = useCategories();

  const router = useRouter();

  useEffect(() => {
    const fetchDataFromApi = async () => {
      await fetchData();
    };
    fetchDataFromApi();
  }, []);

  const handleOptionChange = (event :any) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue); 
  };

  const handleUpdate = async (event: any) => {
    event.preventDefault();

    setIsMutating(true);
    
    const data = {
      title: event.target.title.value,
      description: event.target.description.value,
      image_url: event.target.image.value,
      release_year: event.target.release_year.value,
      price: event.target.price.value,
      total_page: event.target.total_page.value,
      category_id: event.target.category_id.value,
    };

    await updateData(book.id, data);

      setIsMutating(false);
      event.target.reset();
      router.refresh();
      setModal(false);
  };

  function handleChange(event: any) {
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
          <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM51.31,160,136,75.31,152.69,92,68,176.68ZM48,179.31,76.69,208H48Zm48,25.38L79.31,188,164,103.31,180.69,120Zm96-96L147.31,64l24-24L216,84.68Z"></path>
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
          <form method="dialog" onSubmit={handleUpdate}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                name="title"
                placeholder="Title"
                className="shadow appearance-none placeholder:bg-white bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="description"
                placeholder="Description"
                className="shadow appearance-none placeholder:bg-white bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="image"
              >
                Image
              </label>
              <input
                type="text"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                name="image"
                placeholder="Image"
                className="shadow appearance-none placeholder:bg-white bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="release_year"
              >
                Release Year
              </label>
              <input
                type="number"
                id="release_year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                name="release_year"
                placeholder="release_year"
                className="shadow appearance-none placeholder:bg-white bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="price"
              >
                Price
              </label>
              <input
                type="text"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                name="price"
                placeholder="Price"
                className="shadow appearance-none placeholder:bg-white bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="total_page"
              >
                Total Page
              </label>
              <input
                type="number"
                id="total_page"
                value={totalPage}
                onChange={(e) => setTotalPage(e.target.value)}
                name="total_page"
                placeholder="Total Page"
                className="shadow appearance-none placeholder:bg-white bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="category_id "
              >
                Category
              </label>
              <select
                className="select select-bordered w-full "
                id="category_id"
                name="category_id "
                value={selectedOption} 
                onChange={handleOptionChange}
              >
                <option value={book.category.id}  selected>
                  {book.category.name}
                </option>
                {categories.map((option : CategoryType) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
              </select>
            </div>
            <div className="flex items-center justify-between">
              {!isMutating ? (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Save
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Saving...
                </button>
              )}
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default UpdateBookView;
