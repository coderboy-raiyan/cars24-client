import { jwtDecode } from "jwt-decode";

function verifyJwt(token: string) {
  return jwtDecode(token);
}

export default verifyJwt;
