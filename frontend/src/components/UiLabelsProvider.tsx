"use client";

import { createContext, useContext } from "react";
import { emptyUiLabels } from "@/lib/cms/ui-labels";
import type { CmsUiLabels } from "@/lib/cms/types";

const UiLabelsContext = createContext<CmsUiLabels>(emptyUiLabels());

export function UiLabelsProvider({
  labels,
  children
}: {
  labels: CmsUiLabels;
  children: React.ReactNode;
}) {
  return (
    <UiLabelsContext.Provider value={labels}>{children}</UiLabelsContext.Provider>
  );
}

export function useUiLabels() {
  return useContext(UiLabelsContext);
}
