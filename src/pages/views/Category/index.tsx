import { useRouter } from "next/router";
import { useState } from "react";

type CategoryType = {
  name: string;
};

const CategoryView = ({ category }: { category: CategoryType[] }) => {
  const [error, setError] = useState("");
  const { push } = useRouter();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
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
      event.target.reset();
    } else {
      setError(result.status === 400 ? "Email already exists" : "");
    }
  };
  return (
    <div>
      <div>
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-11"
          onSubmit={handleSubmit}
        >
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Tambah
            </button>
          </div>
        </form>
      </div>
      <div className="flex justify-center mt-28">
        <table className="border-collapse border border-slate-500 ">
          <thead>
            <tr>
              <th className="border border-slate-600 ...">name</th>
            </tr>
          </thead>
          <tbody>
            {category.map((category: CategoryType, i: number) => (
              <tr key={i}>
                <td  className="border border-slate-700 ...">
                  {category.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryView;
