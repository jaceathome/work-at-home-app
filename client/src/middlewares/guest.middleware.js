import store from "../store";
import { globals} from "@/config";

export default async function guest({next, router}) {
    const auth = !store.getters.getUser
    if (auth){
        return next()
    }else{
        return router.push({name: globals.HOME_ROUTE_NAME})
    }
}
