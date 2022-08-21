import { api } from "../utils/api"
import { endPoints } from "../utils/consts"
import { User } from "../utils/models"

class UserService {
    getUsers() {
        return api.get(endPoints.USERS)
            .then(res => res)
            .catch(rej => rej)
    }
    getUser(id: number | string) {
        return api.get(endPoints.USERS + '/' + id)
            .then(res => res)
            .catch(rej => rej)
    }

    createUser(data: User) {
        return api.post(endPoints.USERS, data)
            .then(res => res)
            .catch(rej => rej)
    }
}

export default new UserService()