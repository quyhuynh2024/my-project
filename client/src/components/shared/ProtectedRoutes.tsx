import useAuth from "../../hooks/useAuth";

type ProtectedRoutesProps = {
  roleRequired?: "ADMIN" | "USER";
};
const ProtectedRoutes = ({ roleRequired }: ProtectedRoutesProps) => {
  const { auth, role } = useAuth();
  //if the role required is there or not
  if (roleRequired) {
  }
};

export default ProtectedRoutes;
