"use client";

import { useTemplateType } from "@/lib/context/templateType";

const TemplateTypeTitle = () => {
  const { templateType } = useTemplateType();

  return (
    <h1 className="flex h-12 w-full items-center justify-center truncate border-b border-slate-700 text-3xl font-medium tracking-wide text-white antialiased">
      {templateType}
    </h1>
  );
};

export default TemplateTypeTitle;
