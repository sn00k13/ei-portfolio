import { buildListPage } from "@/crud/pages";
import { pmProjectsConfig } from "@/crud/configs";

export const dynamic = "force-dynamic";
export default buildListPage(pmProjectsConfig);
