import type { CmsUiLabels, SectorCategory } from "@/lib/cms/types";

export function getCategoryLabel(category: SectorCategory, labels: CmsUiLabels) {
  switch (category) {
    case "economic":
      return labels.categoryEconomic;
    case "services":
      return labels.categoryServices;
    case "governance":
      return labels.categoryGovernance;
    case "infrastructure":
      return labels.categoryInfrastructure;
    case "social":
      return labels.categorySocial;
    default:
      return "";
  }
}
