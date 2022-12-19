import { DatabaseManager } from "../db/database-manager";
import { QueryResult } from "../db/i-query-result";

export class AuthController {

  constructor(private db: DatabaseManager) { }

  public async login(req: any, res: any) {
    const username = req.body.username;
    const password = req.body.password;

    const result: QueryResult = await this.db.validatePassword(username, password);
    if (result.success && result.result[0]) {
      res.send(result.result[0]['n.id']);
    } else {
      res.status(401).send('Wrong credentials');
    }
  }

  public async register(req: any, res: any) {
    const username = req.body.username;
    const password = req.body.password;
    
    const result: QueryResult = await this.db.registerUser(username, password);
    if (result.success) {
      res.send('OK');
    } else {
      res.status(500).send('Username already used');
    }
  }
}