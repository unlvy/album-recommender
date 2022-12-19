export const QUERY = {
  AUTH: {
    REGISTER: `CREATE (n:User {id: apoc.create.uuid(), username: $username, password: $password})`,
    VALIDATE: `MATCH (n:User) WHERE n.username = $username AND n.password = $password RETURN n.id`
  },
  GENRE: {
    GET: `MATCH (n:Genre) RETURN n.name as name, n.id as id`,
    GET_LIKED: `MATCH (u:User{id: $userID})-[r:LIKES_GENRE]->(g:Genre) RETURN g.id as id`,
    LIKE: `MATCH (u:User), (g:Genre) WHERE u.id = $userID AND g.id = $genreID CREATE (u)-[r:LIKES_GENRE]->(g)`,
    DISLIKE: `MATCH (u:User)-[r:LIKES_GENRE]->(g:Genre) WHERE u.id = $userID AND g.id = $genreID DELETE r`,
    CREATE: `CREATE (n:Genre {id: apoc.create.uuid(), name: $genreName})`
  },
  ARTIST: {
    GET: `MATCH (n:Artist) RETURN n.name as name, n.id as id`,
    GET_LIKED: `MATCH (u:User{id: $userID})-[r:LIKES_ARTIST]->(a:Artist) RETURN a.id as id`,
    LIKE: `MATCH (u:User), (a:Artist) WHERE u.id = $userID AND a.id = $artistID CREATE (u)-[r:LIKES_ARTIST]->(a)`,
    DISLIKE: `MATCH (u:User)-[r:LIKES_ARTIST]->(a:Artist) WHERE u.id = $userID AND a.id = $artistID DELETE r`,
    CREATE: `CREATE (n:Artist {id: apoc.create.uuid(), name: $artistName})`
  },
  ALBUM: {
    GET: `MATCH (a:Album)--(g:Genre), (a:Album)--(x:Artist) OPTIONAL MATCH (u:User)-[r:RATES]->(a:Album) RETURN a.name as name, x.name as artist, a.year as year, a.length as length, a.numTracks as numTracks, a.imageUrl as imageUrl, a.id as id, COLLECT(distinct g.name) as genres, AVG(r.rating) as averageRating`,
    GET_RATINGS: `MATCH (u:User{id: $userID})-[r:RATES]->(a:Album) RETURN a.id as id, r.rating as userRating`,
    RATE: `MATCH (u:User), (a:Album) WHERE u.id = $userID AND a.id = $albumID CREATE (u)-[r:RATES {rating: $rating}]->(a)`,
    UPDATE_RATING: `MATCH (u:User)-[r:RATES]->(a:Album) WHERE u.id = $userID AND a.id = $albumID SET r.rating = $rating`,
    CREATE: `CREATE (a:Album {id: apoc.create.uuid(), name: $name, year: $year, length: duration($length), numTracks: $numTracks, imageUrl: $imageUrl}) RETURN a.id AS id`,
    ADD_ARTIST: `MATCH (a:Album), (x:Artist) WHERE a.id = $albumID AND x.id = $artistID CREATE (x)-[r:CREATED]->(a)`,
    ADD_GENRES: `MATCH (a:Album), (g:Genre) WHERE a.id = $albumID AND ANY (genreID IN g.id WHERE genreID IN $genresIDs) CREATE (a)-[r:BELONGS_TO]->(g)`
  },
  RECOMMENDED: {
    GET_ALBUMS: `
      MATCH (u1:User) WHERE u1.id = $userID
      MATCH (u1)-[r:RATES]->(a:Album)
      WITH u1, avg(r.rating) AS mean1
      MATCH (u1)-[r1:RATES]->(a:Album)<-[r2:RATES]-(u2)
      WITH u1, mean1, u2, COLLECT({r1: r1, r2: r2}) AS ratings WHERE size(ratings) > 1
      MATCH (u2)-[r:RATES]->(a:Album)
      WITH u1, mean1, u2, avg(r.rating) AS mean2, ratings
      UNWIND ratings AS r
      WITH sum((r.r1.rating-mean1) * (r.r2.rating-mean2)) AS nominator, sqrt(sum( (r.r1.rating - mean1)^2) * sum((r.r2.rating - mean2) ^2)) AS denominator, u1, u2
      WHERE denominator <> 0
      WITH u1, u2, nominator/denominator AS pearson
      ORDER BY pearson DESC LIMIT 10
      MATCH (u2)-[r:RATES]->(a:Album) WHERE NOT EXISTS((u1)-[:RATES]->(a))
      MATCH (a:Album)--(g:Genre), (a:Album)--(x:Artist) 
      RETURN a.name as name, x.name as artist, a.year as year, a.length as length, a.numTracks as numTracks, a.imageUrl as imageUrl, a.id as id, COLLECT(g.name) as genres, SUM(pearson * r.rating) AS score
      ORDER BY score DESC LIMIT 3
    `
  }
}
