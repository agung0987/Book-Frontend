// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  error: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/category",
        req.body
      );
      res.status(response.status).json(response.data);
        localStorage.setItem('token', JSON.stringify(response.data.data));
    } catch (error) {

      console.error("Error proxying request to Laravel:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
