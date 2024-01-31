import { CategoryType } from "@/types/category.type";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import AddCategoryView from "./addCategory";
import DeleteCategoryView from "./deleteCategory";

const CategoryView = ({ category }: { category: CategoryType[] }) => {
  return (
    <div>
      <AddCategoryView />
      <div className="flex justify-center mt-20  mx-64 overflow-x-auto">
        <table className="table table-zebra ">
          <thead>
            <tr>
              <th className="border border-slate-600 text-black">Name</th>
              <th className="border border-slate-600 text-black">Action</th>
            </tr>
          </thead>
          <tbody>
            {category.map((category: CategoryType, i: number) => (
              <tr key={i} className="border border-slate-700">
                <td className="border border-slate-700 text-black">
                  {category.name}
                </td>
                <td>
                <DeleteCategoryView category = {category} />
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
