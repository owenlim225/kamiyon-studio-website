import type { StructureResolver } from "sanity/structure";

const singletonListItem = (
  S: Parameters<StructureResolver>[0],
  title: string,
  schemaType: string,
  documentId: string
) =>
  S.listItem()
    .title(title)
    .id(documentId)
    .child(S.document().schemaType(schemaType).documentId(documentId));

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Settings")
        .child(
          S.list()
            .title("Settings")
            .items([singletonListItem(S, "Site Settings", "siteSettings", "siteSettings")])
        ),
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items([
              singletonListItem(S, "Home Page", "homePage", "homePage"),
              singletonListItem(S, "About Page", "aboutPage", "aboutPage"),
              singletonListItem(S, "Contact Page", "contactPage", "contactPage"),
            ])
        ),
      S.divider(),
      S.listItem()
        .title("Collections")
        .child(
          S.list()
            .title("Collections")
            .items([
              S.documentTypeListItem("teamMember").title("Team Members"),
              S.documentTypeListItem("serviceCategory").title("Service Categories"),
              S.documentTypeListItem("service").title("Services"),
              S.documentTypeListItem("product").title("Products"),
              S.documentTypeListItem("caseStudy").title("Case Studies"),
              S.documentTypeListItem("communityItem").title("Community Items"),
            ])
        ),
    ]);
