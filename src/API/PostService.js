import axios from "axios";

export default class PostService {
    static async getAll() {
       const posts = await axios.get('http://contest.elecard.ru/frontend_data/catalog.json')
        return posts
    }
}
