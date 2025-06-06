export default defineNuxtPlugin((nuxtApp) => {
  const toastStore = useToastStore();
  const { $t } = useI18n();

  nuxtApp.hook("sanctum:login", async () => {
    toastStore.success(
      String($t("messages.login.afterLoginMessage")),
      String($t("messages.login.afterLoginMessageTitle"))
    );
  });

  nuxtApp.hook("sanctum:logout", () => {
    toastStore.addToast({
      title: String($t("messages.logout.afterLogoutMessageTitle")),
      description: String($t("messages.logout.afterLogoutMessage")),
      color: "neutral",
    });
  });

  nuxtApp.hook("sanctum:error", (response) => {
    if (response.status === 401) {
      toastStore.error(
        String($t("messages.sessionExpired.message")),
        String($t("messages.sessionExpired.title"))
      );
    }
  });
});
