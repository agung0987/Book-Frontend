import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

export default function withAuth(middleware:NextMiddleware, requireAuth: string[] = []){
    return async (req:NextRequest, next:NextFetchEvent) => {
        const pathname = req.nextUrl.pathname;
        if(requireAuth.includes(pathname)){
            const token = req.cookies.get("token")?.value;
            
            if(!token){
                const url = new URL('/', req.url);
                return NextResponse.redirect(url);
            }
        }
        return middleware(req,next)
    }
}