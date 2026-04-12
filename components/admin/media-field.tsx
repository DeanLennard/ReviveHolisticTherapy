"use client";

import Image from "next/image";
import { useId, useState, useTransition } from "react";

type MediaFieldProps = {
  name: string;
  label: string;
  defaultValue?: string;
  placeholder?: string;
  helpText?: string;
};

export function MediaField({
  name,
  label,
  defaultValue = "",
  placeholder = "Paste an image URL or upload a file",
  helpText = "Upload JPG, PNG, WebP, or GIF files up to 8 MB.",
}: MediaFieldProps) {
  const fieldId = useId();
  const [value, setValue] = useState(defaultValue);
  const [status, setStatus] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleUpload(file: File | null) {
    if (!file) {
      return;
    }

    startTransition(async () => {
      setStatus("Uploading image...");

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/admin/uploads", {
          method: "POST",
          body: formData,
        });

        const payload = (await response.json()) as { error?: string; url?: string };

        if (!response.ok || !payload.url) {
          throw new Error(payload.error || "Upload failed");
        }

        setValue(payload.url);
        setStatus("Upload complete. Image path added to the form.");
      } catch (error) {
        setStatus(error instanceof Error ? error.message : "Upload failed");
      }
    });
  }

  const hasPreview = value.startsWith("/") || value.startsWith("http://") || value.startsWith("https://");

  return (
    <div className="grid gap-3">
      <label htmlFor={fieldId} className="text-sm font-medium text-[color:var(--color-heading)]">
        {label}
      </label>
      <input
        id={fieldId}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(event) => setValue(event.target.value)}
        className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm"
      />
      <div className="flex flex-wrap items-center gap-3">
        <label className="inline-flex cursor-pointer items-center rounded-full border border-[color:var(--color-border)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--color-heading)] transition hover:border-[color:var(--color-accent)]">
          {isPending ? "Uploading..." : "Upload image"}
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="sr-only"
            disabled={isPending}
            onChange={(event) => {
              handleUpload(event.target.files?.[0] ?? null);
              event.currentTarget.value = "";
            }}
          />
        </label>
        <span className="text-xs text-[color:var(--color-text-muted)]">{helpText}</span>
      </div>
      {status ? <p className="text-xs text-[color:var(--color-text-muted)]">{status}</p> : null}
      {hasPreview ? (
        <div className="relative overflow-hidden rounded-[1.25rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
          <div className="relative h-44 w-full">
            <Image src={value} alt="" fill sizes="(max-width: 768px) 100vw, 420px" className="object-cover" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
