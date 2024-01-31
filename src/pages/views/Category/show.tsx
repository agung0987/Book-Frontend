import { CategoryType } from "@/types/category.type";

const ShowCategoryView = ({ category }: { category: CategoryType }) => {
  return (
    <div className="flex flex-row gap-5">
          <p className="border border-slate-700 ...">{category.name}</p>  
    </div>
  );
};

export default ShowCategoryView;
