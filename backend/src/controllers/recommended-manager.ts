import { DatabaseManager } from "../db/database-manager";
import { QueryResult } from "../db/i-query-result";

export class RecommendedController {

  constructor(private db: DatabaseManager) { }

  public async getRecommendedAlbums(req: any, res: any) {
    const userID = req.params.userID;
    const result: QueryResult = await this.db.getRecommendedAlbums(userID);
    if (result.success) {
      res.send(result.result);
    } else {
      res.status(500).send('Error retreiving recommended albums');
    }
  }
}