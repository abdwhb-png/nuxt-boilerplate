interface Feature {
  name: string;
  icon: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  description: string;
  isActive: boolean;
  stats: {
    usage: number;
    performance: number;
  };
}

interface TechStackItem {
  name: string;
  logo: string;
  version: string;
}

export const useFeaturesStore = defineStore("features", () => {
  // State
  const features = ref<Feature[]>([
    {
      name: "typescript",
      icon: "devicon:typescript",
      position: { top: "15%", left: "8%" },
      description: "Type-safe development with TypeScript",
      isActive: true,
      stats: {
        usage: 95,
        performance: 98,
      },
    },
    {
      name: "tailwind",
      icon: "devicon:tailwindcss",
      position: { top: "20%", right: "15%" },
      description: "Utility-first CSS framework",
      isActive: true,
      stats: {
        usage: 88,
        performance: 94,
      },
    },
    {
      name: "auth",
      icon: "heroicons:shield-check",
      position: { bottom: "35%", left: "10%" },
      description: "Secure authentication with Sanctum",
      isActive: true,
      stats: {
        usage: 100,
        performance: 96,
      },
    },
    {
      name: "i18n",
      icon: "heroicons:language",
      position: { bottom: "25%", right: "12%" },
      description: "Multi-language support",
      isActive: true,
      stats: {
        usage: 75,
        performance: 90,
      },
    },
    {
      name: "pinia",
      icon: "logos:pinia",
      position: { top: "50%", left: "5%" },
      description: "Modern state management",
      isActive: true,
      stats: {
        usage: 92,
        performance: 97,
      },
    },
  ]);

  const techStack = ref<TechStackItem[]>([
    { name: "Nuxt", logo: "logos:nuxt-icon", version: "4.0" },
    { name: "Vue", logo: "logos:vue", version: "3.4" },
    { name: "TypeScript", logo: "logos:typescript-icon", version: "5.0" },
    { name: "Tailwind", logo: "logos:tailwindcss-icon", version: "3.4" },
    { name: "Vite", logo: "logos:vitejs", version: "5.0" },
    { name: "Pinia", logo: "logos:pinia", version: "2.1" },
    { name: "ESLint", logo: "logos:eslint", version: "9.0" },
  ]);

  const selectedFeature = ref<Feature | null>(null);
  const isLoading = ref(false);

  // Getters
  const activeFeatures = computed(() =>
    features.value.filter((feature) => feature.isActive)
  );

  const totalFeatures = computed(() => features.value.length);

  const averagePerformance = computed(() => {
    const total = features.value.reduce(
      (sum, feature) => sum + feature.stats.performance,
      0
    );
    return Math.round(total / features.value.length);
  });

  // Actions
  const toggleFeature = (featureName: string) => {
    const feature = features.value.find((f) => f.name === featureName);
    if (feature) {
      feature.isActive = !feature.isActive;
    }
  };
  const selectFeature = (feature: Feature | null) => {
    selectedFeature.value = feature;
  };

  const updateFeatureStats = (
    featureName: string,
    stats: Partial<Feature["stats"]>
  ) => {
    const feature = features.value.find((f) => f.name === featureName);
    if (feature) {
      feature.stats = { ...feature.stats, ...stats };
    }
  };

  const addFeature = (newFeature: Omit<Feature, "isActive" | "stats">) => {
    features.value.push({
      ...newFeature,
      isActive: true,
      stats: { usage: 0, performance: 0 },
    });
  };

  const removeFeature = (featureName: string) => {
    const index = features.value.findIndex((f) => f.name === featureName);
    if (index > -1) {
      features.value.splice(index, 1);
    }
  };

  // Simulate loading state for demo
  const fetchFeatures = async () => {
    isLoading.value = true;
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    isLoading.value = false;
  };

  return {
    // State
    features,
    techStack,
    selectedFeature,
    isLoading,

    // Getters
    activeFeatures,
    totalFeatures,
    averagePerformance,

    // Actions
    toggleFeature,
    selectFeature,
    updateFeatureStats,
    addFeature,
    removeFeature,
    fetchFeatures,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFeaturesStore, import.meta.hot));
}
