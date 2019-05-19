import DatabaseService from "../../database/service";

export default class CommentService extends DatabaseService {
    public getAuthor = async (id: string) => {
        let result:any = await this.database.models.commentModel.findById(id).populate('author');
        return result.author;
    }
}