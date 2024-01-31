import { useState } from "react";
import { useRouter } from "next/navigation";

const AddCategoryView = () => {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsMutating(true);
    const data = {
      name: event.target.name.value,
    };
    const result = await fetch("http://127.0.0.1:3000/api/category", {
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
        {" "}
        ADD
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
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
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

export default AddCategoryView;
