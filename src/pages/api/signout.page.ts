import type { NextApiHandler } from "next";
import { unsetAuthCookies } from "next-firebase-auth";
import { initAuth } from "src/util/auth";

initAuth();

const handler: NextApiHandler = async (req, res) => {
  try {
    await unsetAuthCookies(req, res);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Unexpected error." });
  }
  return res.status(200).json({ status: true });
};

export default handler;
