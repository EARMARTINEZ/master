import axios from "axios";
import { getStrapiURL } from "utils/api";
export default async (req, res) => {
    const URLEndpoint = getStrapiURL("/api/auth/forgot-password");

    if (req.method === 'POST') {
      var resp = {};
      resp = await axios
        .post(URLEndpoint, req.body)
        .then((response) => {
          return res.status(200).json({ message: response.data.user });
        })
        .catch((error) => {
          if (!error.response.data.error.message) {
            return res.status(500).json({ message: 'Internal server error' });
          } else {
            const messages = error.response.data.error.message;
            return res.status(403).json({ message: messages });
          }
        });
    }
  };
  