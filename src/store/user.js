import { create } from "zustand";

const useUserStore = create((set) => ({
  email: "",
  handle: "",
  id: 0,
  isActive: false,
  isVerified: false,
  name: "",
  role: "",
  setUser: (user) => {
    set({
      email: user.email,
      handle: user.handle,
      id: user.id,
      isActive: user.isActive,
      isVerified: user.isVerified,
      name: user.name,
      role: user.role,
    });
  },
}));

export default useUserStore;
