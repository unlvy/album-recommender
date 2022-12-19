import { DatabaseManager } from "../db/database-manager";
import { QueryResult } from "../db/i-query-result";

export class AlbumsController {

  constructor(private db: DatabaseManager) { }

  public async getAlbums(req: any, res: any) {
    const result: QueryResult = await this.db.getAlbums();
    if (result.success) {
      res.send(result.result);
    } else {
      res.status(500).send('Error retreiving albums');
    }
  }

  public async getAlbumsUserRatings(req: any, res: any) {
    const userID = req.params.userID;
    const result: QueryResult = await this.db.getAlbumsRatings(userID);
    if (result.success) {
      res.send(result.result);
    } else {
      res.status(500).send('Error retreiving albums');
    }
  }

  public async rateAlbum(req: any, res: any) {
    const userID = req.body.userID;
    const rating = req.body.rating;
    const albumID = req.body.albumID;
    const result: QueryResult = await this.db.rateAlbum(userID, albumID, rating);
    if (result.success) {
      res.send(result.result);
    } else {
      res.status(500).send('Error rating album');
    }
  }

  public async changeAlbumRating(req: any, res: any) {
    const userID = req.body.userID;
    const rating = req.body.rating;
    const albumID = req.body.albumID;
    const result: QueryResult = await this.db.updateAlbumRating(userID, albumID, rating);
    if (result.success) {
      res.send(result.result);
    } else {
      res.status(500).send('Error rating album');
    }
  }

  public async createAlbum(req: any, res: any) {
    const album = req.body;
    const result: QueryResult = await this.db.createAlbum(album);
    if (result.success) {
      res.send(result.result);
    } else {
      res.status(500).send('Error creatomg album');
    }
  }
}