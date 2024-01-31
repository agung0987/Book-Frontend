import { CategoryType } from "@/types/category.type";
import ShowCategoryView from "../views/Category/showCategory";

const DetailCategoryPage = ({category}:{category:CategoryType}) => {
    return(
        <div>
            <ShowCategoryView category = {category}/>
        </div>
    );
};

export default DetailCategoryPage;

export async function getServerSideProps({params}:{params:{category:string, id: string}}) {
    // fetch data 
    const res = await fetch(`http://127.0.0.1:3000/api/categories/${params.id}`);
    const response  = await res.json();

    return {
        props: {
            category: response.data
        }
    }
}


