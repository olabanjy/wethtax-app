import { useStore } from "@/store";

const useUser = () => {
  const { details: user } = useStore((s) => s.auth);

  if (!user) return { user: null, isLoggedIn: false, type: null };

  return { user, isLoggedIn: !!user, type: user.user_type };
};

export default useUser;
