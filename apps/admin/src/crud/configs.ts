import type { CrudConfig } from "./types";

export const eventsConfig: CrudConfig = {
  sectionId: "events",
  modelName: "event",
  routeBase: "/events",
  label: "Events",
  titleField: "name",
  subtitleField: "location",
  statusField: "status",
  orderBy: { dateStart: "desc" },
  fields: [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "type", label: "Type", type: "text", required: true },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: ["upcoming", "past", "attending"],
    },
    { name: "dateStart", label: "Start date", type: "date", required: true },
    { name: "dateEnd", label: "End date", type: "date" },
    { name: "location", label: "Location", type: "text", required: true },
    { name: "organisation", label: "Organisation", type: "text" },
    { name: "myRole", label: "My role", type: "text" },
    { name: "coverImage", label: "Cover image", type: "image" },
    { name: "eventLink", label: "Event link", type: "url" },
    { name: "shortDescription", label: "Short description", type: "textarea" },
    { name: "fullDescription", label: "Full description", type: "textarea" },
  ],
};

export const speakingConfig: CrudConfig = {
  sectionId: "speaking",
  modelName: "speakingCard",
  routeBase: "/speaking",
  label: "Speaking & Media",
  titleField: "title",
  subtitleField: "location",
  statusField: "status",
  orderBy: { displayOrder: "asc" },
  fields: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "type", label: "Type", type: "text", required: true },
    { name: "datePeriod", label: "Date / period", type: "text" },
    { name: "location", label: "Location", type: "text" },
    { name: "organisation", label: "Organisation", type: "text" },
    { name: "myRole", label: "My role", type: "text" },
    { name: "shortDescription", label: "Short description", type: "textarea" },
    { name: "fullDescription", label: "Full description", type: "textarea" },
    { name: "coverImage", label: "Cover image", type: "image" },
    { name: "status", label: "Status", type: "select", options: ["upcoming", "past"] },
    { name: "displayOrder", label: "Display order", type: "number" },
  ],
};

export const testimonialsConfig: CrudConfig = {
  sectionId: "testimonials",
  modelName: "testimonial",
  routeBase: "/testimonials",
  label: "Testimonials",
  titleField: "name",
  subtitleField: "role",
  statusField: "status",
  orderBy: { displayOrder: "asc" },
  fields: [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "quote", label: "Quote", type: "textarea", required: true },
    { name: "role", label: "Role", type: "text" },
    { name: "avatar", label: "Avatar", type: "image" },
    { name: "status", label: "Status", type: "select", options: ["active", "inactive"] },
    { name: "displayOrder", label: "Display order", type: "number" },
  ],
};

export const certificationsConfig: CrudConfig = {
  sectionId: "certifications",
  modelName: "certification",
  routeBase: "/certifications",
  label: "Certifications",
  titleField: "name",
  subtitleField: "issuer",
  orderBy: { displayOrder: "asc" },
  fields: [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "issuer", label: "Issuer", type: "text", required: true },
    { name: "dateEarned", label: "Date earned", type: "text" },
    { name: "group", label: "Group", type: "text" },
    { name: "credentialUrl", label: "Credential URL", type: "url" },
    { name: "displayOrder", label: "Display order", type: "number" },
  ],
};

export const productsConfig: CrudConfig = {
  sectionId: "products",
  modelName: "product",
  routeBase: "/products",
  label: "Products (Web & Apps)",
  titleField: "name",
  subtitleField: "sector",
  statusField: "status",
  orderBy: { displayOrder: "asc" },
  fields: [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "sector", label: "Sector", type: "text" },
    { name: "status", label: "Status", type: "select", options: ["progress", "live", "archived"] },
    { name: "description", label: "Description", type: "textarea" },
    { name: "techStack", label: "Tech stack (comma-separated)", type: "tags" },
    { name: "logoUrl", label: "Logo", type: "image" },
    { name: "websiteUrl", label: "Website URL", type: "url" },
    { name: "displayOrder", label: "Display order", type: "number" },
  ],
};

export const pmProjectsConfig: CrudConfig = {
  sectionId: "pmprojects",
  modelName: "pmProject",
  routeBase: "/pmprojects",
  label: "PM Projects",
  titleField: "name",
  subtitleField: "role",
  statusField: "status",
  orderBy: { displayOrder: "asc" },
  fields: [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "role", label: "Role", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "status", label: "Status", type: "select", options: ["active", "completed"] },
    { name: "displayOrder", label: "Display order", type: "number" },
  ],
};

export const qaProductsConfig: CrudConfig = {
  sectionId: "qaproducts",
  modelName: "qaProduct",
  routeBase: "/qaproducts",
  label: "QA Products",
  titleField: "name",
  subtitleField: "sector",
  orderBy: { displayOrder: "asc" },
  fields: [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "sector", label: "Sector", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "displayOrder", label: "Display order", type: "number" },
  ],
};

export const venturesConfig: CrudConfig = {
  sectionId: "ventures",
  modelName: "venture",
  routeBase: "/ventures",
  label: "Ventures",
  titleField: "name",
  subtitleField: "type",
  statusField: "status",
  orderBy: { displayOrder: "asc" },
  fields: [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "type", label: "Type", type: "text" },
    { name: "role", label: "Role", type: "text" },
    { name: "status", label: "Status", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "logoUrl", label: "Logo", type: "image" },
    { name: "accentColor", label: "Accent color (hex)", type: "text" },
    { name: "websiteUrl", label: "Website URL", type: "url" },
    { name: "displayOrder", label: "Display order", type: "number" },
  ],
};

export const toolsConfig: CrudConfig = {
  sectionId: "tools",
  modelName: "cyberTool",
  routeBase: "/tools",
  label: "Tools Built",
  titleField: "name",
  subtitleField: "category",
  orderBy: { displayOrder: "asc" },
  fields: [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "category", label: "Category", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "techStack", label: "Tech stack (comma-separated)", type: "tags" },
    { name: "githubUrl", label: "GitHub URL", type: "url" },
    { name: "displayOrder", label: "Display order", type: "number" },
  ],
};

export const assessmentsConfig: CrudConfig = {
  sectionId: "assessments",
  modelName: "assessment",
  routeBase: "/assessments",
  label: "Assessments",
  titleField: "title",
  subtitleField: "tag",
  orderBy: { displayOrder: "asc" },
  fields: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "tag", label: "Tag", type: "text" },
    { name: "label", label: "Label", type: "text" },
    { name: "overview", label: "Overview", type: "textarea" },
    { name: "findings", label: "Findings (comma-separated)", type: "tags" },
    { name: "outcome", label: "Outcome", type: "textarea" },
    { name: "toolsUsed", label: "Tools used (comma-separated)", type: "tags" },
    { name: "metrics", label: "Metrics (JSON)", type: "json" },
    { name: "displayOrder", label: "Display order", type: "number" },
  ],
};

export const allCrudConfigs = [
  eventsConfig,
  speakingConfig,
  testimonialsConfig,
  certificationsConfig,
  productsConfig,
  pmProjectsConfig,
  qaProductsConfig,
  venturesConfig,
  toolsConfig,
  assessmentsConfig,
];
