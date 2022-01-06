import store from "../store";
import { globals } from "@/config";

export default async function auth({ next, router }) {
    let auth = store.getters.getUser
    if (auth && auth.role === 'admin-role') {
        return next();
    } else {
        return router.push({ name: globals.HOME_ROUTE_NAME })
    }
}
