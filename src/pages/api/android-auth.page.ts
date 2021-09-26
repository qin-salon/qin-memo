import type { NextApiRequest, NextApiResponse } from "next";

const androidAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const redirect = `intent://callback?${new URLSearchParams(req.body).toString()}#Intent;package=${
    process.env.ANDROID_PACKAGE_NAME
  };scheme=signinwithapple;end`;

  res.redirect(307, redirect);
};

// eslint-disable-next-line import/no-default-export
export default androidAuth;
