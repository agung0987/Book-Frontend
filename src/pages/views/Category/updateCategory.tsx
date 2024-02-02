import { useState } from "react";
import { useRouter } from "next/navigation";
import { CategoryType } from "@/types/category.type";
import { useCategories } from "@/store/categorys/crud";

const UpdateCategoryView = ({ category }: { category: CategoryType }) => {
  const { updateData } = useCategories();
  const [name, setName] = useState(category?.name);
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  const handleUpdate = async (event: any) => {
    event.preventDefault();
    setIsMutating(true);
    const data : { name: string }= {
      name: name,
    };
    
    await updateData(category.id, data);
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
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                placeholder="Name"
                className="shadow appearance-none placeholder:bg-white bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
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

export default UpdateCategoryView;
