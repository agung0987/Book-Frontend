import { useState } from "react";
import { useRouter } from "next/navigation";
import { CategoryType } from "@/types/category.type";

const UpdateCategoryView = ({ category }: { category: CategoryType }) => {
  const [name, setName] = useState(category.name);
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  const handleUpdate = async (event: any) => {
    event.preventDefault();

    setIsMutating(true);
    const data = {
      name: event.target.name.value,
    };
    const result = await fetch(`http://127.0.0.1:3000/api/book/${category.id}`, {
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
        {" "}
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
