import { buildListPage } from "@/crud/pages";
import { qaProductsConfig } from "@/crud/configs";

export const dynamic = "force-dynamic";
export default buildListPage(qaProductsConfig);
