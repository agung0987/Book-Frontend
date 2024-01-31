import { CategoryType } from "@/types/category.type";
import CategoryView from "../views/Category";

const CategoryPage = (props: {category: CategoryType[]}) => {
    const {category} = props;
    return (
        <div>
            <CategoryView category={category} />
        </div>
      );
}

export default CategoryPage;

export async function getServerSideProps() {
    // fetch data 
    const res = await fetch('http://127.0.0.1:3000/api/category');
    const response  = await res.json();

    return {
        props: {
            category: response.data
        }
    }
}