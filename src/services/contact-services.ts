import { api } from "../utils/api"
import { endPoints } from "../utils/consts"
import { Contact } from "../utils/models"

class ContactService {
    getContacts() {
        return api.get(endPoints.CONTACTS)
            .then(res => res)
            .catch(rej => rej)
    }
    getContact(id: number | string) {
        return api.get(endPoints.CONTACTS + '/' + id)
            .then(res => res)
            .catch(rej => rej)
    }

    createContact(data: Contact) {
        return api.post(endPoints.CONTACTS, data)
            .then(res => res)
            .catch(rej => rej)
    }

    updateContact(data: Contact, id: number | string) {
        return api.put(endPoints.CONTACTS + '/' + id, data)
            .then(res => res)
            .catch(rej => rej)
    }
    deleteContact(id: number | string) {
        return api.delete(endPoints.CONTACTS + '/' + id)
            .then(res => res)
            .catch(rej => rej)
    }
}

export default new ContactService()