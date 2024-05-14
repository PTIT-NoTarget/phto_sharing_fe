import { create } from "zustand";
const useUserStore = create((set) => ({
  auth: false,
  user: {},
  otherUser: {},
  userList: [],
  setAuth: (auth) => set({ auth: auth }),
  setUser: (user) => set({ user: user }),
  setOtherUser: (otherUser) => set({ otherUser: otherUser }),
  setUserList: (userList) => set({ userList: userList }),
}));

export default useUserStore;  