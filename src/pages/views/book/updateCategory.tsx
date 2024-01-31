import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CategoryType } from "@/types/category.type";
import { BooksType } from "@/types/books.type";

const UpdateBookView = ({ book }: { book: BooksType }) => {
  const [title, setTitle] = useState(book.title);
  const [description, setDescription] = useState(book.description);
  const [image, setImage] = useState(book.image_url);
  const [year, setYear] = useState(book.release_year || '' );
  const [price, setPrice] = useState(book.price);
  const [totalPage, setTotalPage] = useState(book.total_page ||'');
  const [categoryId, setCategory] = useState(book.category);
  const [modal, setModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  const [options, setOptions] = useState([]);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {fetchOptions();}, 3000);
  }, []);

  const fetchOptions = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:3000/api/categories"
      ); 
      const data = await response.json();
      setOptions(data.data);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

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

    const result = await fetch(`http://127.0.0.1:3000/api/books/${book.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
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
        Edit
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
                <option value={categoryId.id}  selected>
                  {categoryId.name}
                </option>
                {options.map((option : CategoryType) => (
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
