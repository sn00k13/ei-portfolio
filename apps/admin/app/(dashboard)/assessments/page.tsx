import { buildListPage } from "@/crud/pages";
import { assessmentsConfig } from "@/crud/configs";

export const dynamic = "force-dynamic";
export default buildListPage(assessmentsConfig);
