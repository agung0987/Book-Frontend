import { CategoryType } from "@/types/category.type";
import { useState } from "react";

const ShowCategoryView = ({ category }: { category: CategoryType }) => {
  const [modal, setModal] = useState(false);
  
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const data = {
      name: event.target.name.value,
    };
    const result = await fetch("http://127.0.0.1:3000/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (result.status === 200) {
      event.target.reset();
      setModal(false);
    }
  };
  function handleChange() {
    setModal(!modal);
  }
  return (
    <div>
      <button className="btn" onClick={handleChange}>
        Show
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
            <h1>
              
            </h1>
        </div>
      </dialog>
    </div>
  );
};

export default ShowCategoryView;
