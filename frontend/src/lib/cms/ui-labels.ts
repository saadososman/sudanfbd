import type { CmsUiLabels } from "@/lib/cms/types";

export function emptyUiLabels(): CmsUiLabels {
  return {
    search: "",
    newsSearch: "",
    newsLabel: "",
    noNews: "",
    readArticle: "",
    publishedOn: "",
    backToNews: "",
    readMore: "",
    download: "",
    noDocs: "",
    upload: "",
    publish: "",
    formTitle: "",
    sector: "",
    file: "",
    formLocale: "",
    statusReady: "",
    sectorsSearch: "",
    sectorsEmpty: "",
    viewSector: "",
    adminIntegrationTitle: "",
    adminIntegrationBody: "",
    uploadDisabled: "",
    uploading: "",
    uploadSuccess: "",
    uploadFailed: "",
    sectorScopeKicker: "",
    sectorScopeTitle: "",
    categoryEconomic: "",
    categoryServices: "",
    categoryGovernance: "",
    categoryInfrastructure: "",
    categorySocial: ""
  };
}

function readLabel(value: unknown) {
  return typeof value === "string" ? value : "";
}

export function mapUiLabels(value: unknown): CmsUiLabels {
  const fields =
    value && typeof value === "object"
      ? ((value as Record<string, unknown>).attributes &&
        typeof (value as Record<string, unknown>).attributes === "object"
          ? ((value as Record<string, unknown>).attributes as Record<string, unknown>)
          : (value as Record<string, unknown>))
      : {};

  return {
    search: readLabel(fields.search),
    newsSearch: readLabel(fields.newsSearch),
    newsLabel: readLabel(fields.newsLabel),
    noNews: readLabel(fields.noNews),
    readArticle: readLabel(fields.readArticle),
    publishedOn: readLabel(fields.publishedOn),
    backToNews: readLabel(fields.backToNews),
    readMore: readLabel(fields.readMore),
    download: readLabel(fields.download),
    noDocs: readLabel(fields.noDocs),
    upload: readLabel(fields.upload),
    publish: readLabel(fields.publish),
    formTitle: readLabel(fields.formTitle),
    sector: readLabel(fields.sector),
    file: readLabel(fields.file),
    formLocale: readLabel(fields.formLocale),
    statusReady: readLabel(fields.statusReady),
    sectorsSearch: readLabel(fields.sectorsSearch),
    sectorsEmpty: readLabel(fields.sectorsEmpty),
    viewSector: readLabel(fields.viewSector),
    adminIntegrationTitle: readLabel(fields.adminIntegrationTitle),
    adminIntegrationBody: readLabel(fields.adminIntegrationBody),
    uploadDisabled: readLabel(fields.uploadDisabled),
    uploading: readLabel(fields.uploading),
    uploadSuccess: readLabel(fields.uploadSuccess),
    uploadFailed: readLabel(fields.uploadFailed),
    sectorScopeKicker: readLabel(fields.sectorScopeKicker),
    sectorScopeTitle: readLabel(fields.sectorScopeTitle),
    categoryEconomic: readLabel(fields.categoryEconomic),
    categoryServices: readLabel(fields.categoryServices),
    categoryGovernance: readLabel(fields.categoryGovernance),
    categoryInfrastructure: readLabel(fields.categoryInfrastructure),
    categorySocial: readLabel(fields.categorySocial)
  };
}
