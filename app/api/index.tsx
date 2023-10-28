import connectMongo from "../../backend/database/conn";
import {
  getProperties,
  putProperty,
  postProperty,
  deleteProperty,
} from "../../backend/database/controller";

export default async function handler(req: any, res: any) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the Connection" })
  );

  // type of request
  const { method } = req;

  switch (method) {
    case "GET":
      getProperties(req, res);
      break;
    case "POST":
      postProperty(req, res);
      break;
    case "PUT":
      putProperty(req, res);
      break;
    case "DELETE":
      deleteProperty(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
