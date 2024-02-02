import { useRouter } from "next/router";
import Navbar from "../navbar";

type AppShellProps = {
    children: React.ReactNode;
}

const disableNavbar =["/"]
const AppShell = (props: AppShellProps) =>{
    const {children} = props;
    const {pathname} = useRouter();
    return(
        <main>
            {!disableNavbar.includes(pathname)&& <Navbar />}
            {children}
        </main>
    );
};

export default AppShell;
