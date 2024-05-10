import { useSelector } from "react-redux";
export const useGetAuthenticationStatus = () => {
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  return { _id, token };
};
