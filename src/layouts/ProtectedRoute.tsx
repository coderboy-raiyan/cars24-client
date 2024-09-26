import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { TUser, TUserRole } from "../types/user.type";
import verifyJwt from "../utils/verifyJwt";

function ProtectedRoute({
  children,
  requiredRoles,
}: {
  children: React.ReactNode;
  requiredRoles: TUserRole[];
}) {
  const { accessToken } = useAppSelector((auth) => auth?.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      return navigate("/sign-in");
    }

    const verifiedUser = verifyJwt(accessToken as string) as TUser;
    if (!requiredRoles.includes(verifiedUser?.role)) {
      return navigate("/");
    }
  }, [accessToken]);

  return <div>{children}</div>;
}

export default ProtectedRoute;
