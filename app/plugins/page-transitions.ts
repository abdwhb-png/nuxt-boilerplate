export default defineNuxtPlugin(() => {
  // Add default page transition
  const pageTransition = {
    name: "page",
    mode: "out-in",
  };

  // Apply transition to all pages
  // but let individual page settings override this
  const nuxtApp = useNuxtApp();
  nuxtApp.hook("page:transition", (route) => {
    // Return null to allow page-specific transitions defined with definePageMeta
    // If no transition is defined on the page, use the default
    return null;
  });

  // Ensure all layouts have a consistent transition
  nuxtApp.hook("layout:transition", () => {
    return {
      name: "layout",
      mode: "out-in",
    };
  });
});
