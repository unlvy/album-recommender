import { DatabaseManager } from "../db/database-manager";
import { QueryResult } from "../db/i-query-result";

export class GenresController {

  constructor(private db: DatabaseManager) { }

  public async getGenres(req: any, res: any) {
    const result: QueryResult = await this.db.getGenres();
    if (result.success) {
      res.send(result.result);
    } else {
      res.status(500).send('Error retreiving genres');
    }
  }

  public async getUserLikedGenres(req: any, res: any) {
    const userID = req.params.userID;
    const result: QueryResult = await this.db.getUserLikedGenres(userID);
    if (result.success) {
      res.send(result.result);
    } else {
      res.status(500).send('Error retreiving genres');
    }
  }

  public async likeGenre(req: any, res: any) {
    const userID = req.body.userID;
    const genreID = req.body.genreID;
    const result: QueryResult = await this.db.likeGenre(userID, genreID);
    if (result.success) {
      res.send(result.result);
    } else {
      res.status(500).send('Error while liking genre');
    }
  }

  public async dislikeGenre(req: any, res: any) {
    const userID = req.body.userID;
    const genreID = req.body.genreID;
    const result: QueryResult = await this.db.dislikeGenre(userID, genreID);
    if (result.success) {
      res.send(result.result);
    } else {
      res.status(500).send('Error while disliking genre');
    }
  }

  public async createGenre(req: any, res: any) {
    const genreName = req.body.genreName;
    const result: QueryResult = await this.db.createGenre(genreName);
    if (result.success) {
      res.send(result.result);
    } else {
      res.status(500).send('Error while creating genre');
    }
  }
}