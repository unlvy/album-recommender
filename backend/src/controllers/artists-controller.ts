import { DatabaseManager } from "../db/database-manager";
import { QueryResult } from "../db/i-query-result";

export class ArtistsController {

  constructor(private db: DatabaseManager) { }

  public async getArtists(req: any, res: any) {
    const result: QueryResult = await this.db.getArtists();
    if (result.success) {
      res.send(result.result);
    } else {
      res.status(500).send('Error retreiving artists');
    }
  }

  public async getUserLikedArtists(req: any, res: any) {
    const userID = req.params.userID;
    const result: QueryResult = await this.db.getUserLikedArtists(userID);
    if (result.success) {
      res.send(result.result);
    } else {
      res.status(500).send('Error retreiving artists');
    }
  }

  public async likeArtist(req: any, res: any) {
    const userID = req.body.userID;
    const artistID = req.body.artistID;
    const result: QueryResult = await this.db.likeArtist(userID, artistID);
    if (result.success) {
      res.send(result.result);
    } else {
      res.status(500).send('Error while liking artist');
    }
  }

  public async dislikeArtist(req: any, res: any) {
    const userID = req.body.userID;
    const artistID = req.body.artistID;
    const result: QueryResult = await this.db.dislikeArtist(userID, artistID);
    if (result.success) {
      res.send(result.result);
    } else {
      res.status(500).send('Error while disliking artist');
    }
  }

  public async createArtist(req: any, res: any) {
    const artistName = req.body.artistName;
    const result: QueryResult = await this.db.createArtist(artistName);
    if (result.success) {
      res.send(result.result);
    } else {
      res.status(500).send('Error while creating artist');
    }
  }
}