import type { CollectionConfig } from "payload";
import { slugField } from "payload";

import { seoFieldGroup } from "../fields/seo";
import { productMediaFields } from "../fields/shared";

export const Products: CollectionConfig = {
  slug: "products",
  labels: { singular: "Product", plural: "Products" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "developmentStatus", "order", "isPlaceholder"],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "title", type: "text", required: true },
    slugField(),
    { name: "tagline", type: "text", required: true },
    { name: "genre", type: "text", required: true },
    {
      name: "status",
      type: "select",
      required: true,
      options: [{ label: "Original IP", value: "original-ip" }],
      defaultValue: "original-ip",
      admin: { position: "sidebar" },
    },
    {
      name: "developmentStatus",
      type: "select",
      required: true,
      options: [
        { label: "In development", value: "in-development" },
        { label: "Prototype", value: "prototype" },
        { label: "Released", value: "released" },
        { label: "TBD", value: "tbd" },
      ],
      defaultValue: "tbd",
      admin: { position: "sidebar" },
    },
    { name: "overview", type: "textarea", required: true },
    {
      name: "goals",
      type: "array",
      fields: [{ name: "value", type: "text", required: true }],
    },
    {
      name: "features",
      type: "array",
      fields: [{ name: "value", type: "text", required: true }],
    },
    {
      name: "platforms",
      type: "array",
      fields: [{ name: "value", type: "text", required: true }],
    },
    {
      name: "media",
      type: "array",
      fields: productMediaFields,
    },
    { name: "trailerUrl", type: "text" },
    {
      name: "isPlaceholder",
      type: "checkbox",
      defaultValue: true,
      admin: { position: "sidebar" },
    },
    { name: "order", type: "number", required: true },
    seoFieldGroup,
  ],
};
