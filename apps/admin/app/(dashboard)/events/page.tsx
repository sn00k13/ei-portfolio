import { buildListPage } from "@/crud/pages";
import { eventsConfig } from "@/crud/configs";

export const dynamic = "force-dynamic";
export default buildListPage(eventsConfig);
