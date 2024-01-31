import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CategoryType } from "@/types/category.type";

const AddBookView = () => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  const [modal, setModal] = useState(false);
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

  const handleSubmit = async (event: any) => {
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

    const result = await fetch("http://127.0.0.1:3000/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (result.status === 200) {
      setIsMutating(false);
      event.target.reset();
      router.refresh();
      setModal(false);
    }
  };

  function handleChange() {
    setModal(!modal);
  }
  return (
    <div>
      <button className="btn" onClick={handleChange}>
        Add
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
          <form method="dialog" onSubmit={handleSubmit}>
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
                <option disabled selected>
                  Pilih Category
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

export default AddBookView;
