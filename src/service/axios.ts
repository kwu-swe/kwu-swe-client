import { handler } from "axios-wizard";
import { Cookies } from "react-cookie";

const cookies = new Cookies();
const httpRequest = handler({
  api: import.meta.env.VITE_API_ORIGIN,
}, {
  interceptor: {
    async onRequest(config) {
      const accessToken = cookies.get('accessToken');
      if (accessToken) {
        config.headers!['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
  },
});

export default httpRequest;
