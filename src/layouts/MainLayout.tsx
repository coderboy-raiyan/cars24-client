import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import { useGetUserProfileQuery } from "../redux/features/authApi";
import { setUser } from "../redux/features/authSlice";
import { useAppSelector } from "../redux/hooks";

function MainLayout() {
  const dispatch = useDispatch();
  const { accessToken } = useAppSelector((auth) => auth?.auth);
  const { data, isSuccess } = useGetUserProfileQuery(null, {
    skip: !accessToken,
  });

  useEffect(() => {
    if (isSuccess && accessToken) {
      dispatch(setUser({ user: data?.data, accessToken }));
    }
  }, [isSuccess]);

  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
}

export default MainLayout;
