import type { IncomingMessage, ServerResponse } from "http";
import httpProxy from "http-proxy";

const target = "https://qin-memo-api-uphdp3hzga-uc.a.run.app/";
const proxy = httpProxy.createProxyServer({ target, changeOrigin: true });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  req.url = req.url?.replace(new RegExp("^/api/proxy"), "");

  return new Promise((resolve, reject) => {
    try {
      proxy.web(req, res, { proxyTimeout: 2000 }, (e) => {
        reject(e);
      });
      resolve;
    } catch (e) {
      reject(e);
    }
  });
}
