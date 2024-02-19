const useAuth = (): { auth: boolean; role: string | null } => {
  // get item from localStorage
  let user: any;

  const _user = localStorage.getItem("user");

  if (_user) {
    user = JSON.parse(_user);
  }

  return user ? { auth: true, role: user.role } : { auth: false, role: null };
};

export default useAuth;
