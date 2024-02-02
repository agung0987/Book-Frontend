import { CategoryType } from "@/types/category.type";
import AddCategoryView from "./addCategory";
import DeleteCategoryView from "./deleteCategory";
import UpdateCategoryView from "./updateCategory";
import { useCategories } from "@/store/categorys/crud";
import { useEffect } from "react";
import CategoryIdBook from "@/pages/categorys/[CategoryIdBook]";
import Link from "next/link";

const CategoryView = () => {
  const { categories, fetchData } = useCategories();
  useEffect(() => {
    const fetchDataFromApi = async () => {
      await fetchData();
    };
    fetchDataFromApi();
  }, []);
  return (
    <div>
      <div className="flex justify-end mt-20 mx-44 overflow-x-auto">
        <AddCategoryView />
      </div>
      <div className="flex justify-center mx-44 mt-1 overflow-x-auto">
        <table className="table table-zebra ">
          <thead>
            <tr>
              <th className="border border-slate-600 bg-sky-100  text-black text-base">
                Name
              </th>
              <th className="border border-slate-600 bg-sky-100 text-black text-base">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category: CategoryType, i: number) => (
              <tr key={i} className="border border-slate-700">
                <td className="border border-slate-700 text-black">
                  {category.name}
                </td>
                <td className="flex space-x-2">
                  <div className="flex">
                    <UpdateCategoryView category={category} />
                  </div>
                  <div className="flex">
                    <DeleteCategoryView category={category} />
                  </div>
                  <div className="flex">
                    <Link href={`/categorys/${category.id}`}>
                      details
                    </Link>
                  </div>
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
