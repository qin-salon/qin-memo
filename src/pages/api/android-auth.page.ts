import type { NextApiRequest, NextApiResponse } from "next";

const insertQuotaMember = async (req: NextApiRequest, res: NextApiResponse) => {
  const redirect = `intent://callback?${new URLSearchParams(
    req.body
  ).toString()}#Intent;package=${"sh.memo.qin.dev"};scheme=signinwithapple;end`;
  res.redirect(307, redirect);
};

// eslint-disable-next-line import/no-default-export
export default insertQuotaMember;
