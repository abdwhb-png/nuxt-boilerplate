import type { ToastProps } from "@nuxt/ui";

export const useToastStore = defineStore("toastStore", {
  state: () => ({
    bus: [] as ToastProps[],
  }),

  getters: {
    getBus: (state) => state.bus,
  },

  actions: {
    addToast(toast: ToastProps) {
      (this.bus as ToastProps[]).push(toast);
    },

    success(message: string, title: string = "Success") {
      this.addToast({
        title,
        description: message,
        color: "success",
      });
    },

    error(message: string, title: string = "Error") {
      this.addToast({
        title,
        description: message,
        color: "error",
      });
    },

    info(message: string, title: string = "Information") {
      this.addToast({
        title,
        description: message,
        color: "info",
      });
    },

    warning(message: string, title: string = "Warning") {
      this.addToast({
        title,
        description: message,
        color: "warning",
      });
    },

    clearBus() {
      this.bus = [];
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useToastStore, import.meta.hot));
}
