import { CategoryType } from "@/types/category.type";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteCategoryView = ({ category }: { category: CategoryType }) => {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  const handleDelete = async (categoryId: number) => {
    setIsMutating(true);

    const result = await fetch(
      `http://127.0.0.1:3000/api/categories/${categoryId}`,
      {
        method: "DELETE",
      }
    );

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
        Delete
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
          <h3 className="font-bold text-lg">Are sure to delete {category.name}</h3>
          <div className="flex items-center justify-between mt-3">
            {!isMutating ? (
              <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => handleDelete(category.id)}
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

export default DeleteCategoryView;
