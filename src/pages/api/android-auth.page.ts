import type { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const redirect = `intent://callback?${new URLSearchParams(req.body).toString()}#Intent;package=${
    process.env.ANDROID_PACKAGE_NAME
  };scheme=signinwithapple;end`;

  res.redirect(307, redirect);
};

export default handler;
