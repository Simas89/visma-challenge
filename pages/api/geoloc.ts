import type { NextApiRequest as Req, NextApiResponse as Res } from "next";
import axios from "axios";

const key = process.env.POSITIONSTACK_API_KEY as string;

const geoLoc = async (req: Req, res: Res) => {
  const address = encodeURI(req.query.address as string);

  const path = `http://api.positionstack.com/v1/forward?access_key=${key}&query=${address}&output=json&limit=1`;

  try {
    const { data } = await axios({
      method: "GET",
      url: path,
    }).then((res) => res.data);

    return res.status(200).json({ data });
  } catch (error: any) {
    res
      .status(error.response?.status || 500)
      .json({ error: error.message || "Server error" });
  }
};

export default geoLoc;
