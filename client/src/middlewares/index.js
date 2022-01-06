import auth from "./auth.middleware"
import guest from "./guest.middleware"
import admin from "./admin.middleware"
import manager from "./manager.middleware"
import adminManager from "./admin.manager.middleware"

export default {
    auth,
    guest,
    admin,
    manager,
    adminManager
}
