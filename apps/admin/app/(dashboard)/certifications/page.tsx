import { buildListPage } from "@/crud/pages";
import { certificationsConfig } from "@/crud/configs";

export const dynamic = "force-dynamic";
export default buildListPage(certificationsConfig);
