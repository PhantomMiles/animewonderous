-- Add publication state so proposed catalog items can remain admin-only drafts.
ALTER TABLE "Product"
  ADD COLUMN "isPublished" BOOLEAN NOT NULL DEFAULT true;

