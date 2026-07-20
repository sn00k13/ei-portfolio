import { buildListPage } from "@/crud/pages";
import { productsConfig } from "@/crud/configs";

export const dynamic = "force-dynamic";
export default buildListPage(productsConfig);
