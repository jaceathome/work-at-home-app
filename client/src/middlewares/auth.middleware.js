import store from "../store";
import { globals } from "@/config";

export default async function auth({ next, router }) {
    let auth = store.getters.getUser
    if (auth) {
        return next();
    } else {
        return router.push({ name: globals.LOGIN_ROUTE_NAME })
    }
}
