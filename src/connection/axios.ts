import { handler } from "axios-wizard";
const httpRequest = handler({
  api: import.meta.env.VITE_API_ORIGIN,
});

export default httpRequest;
