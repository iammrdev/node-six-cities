export const getURI = (
  host: string,
  port: number,
  databaseName: string,
  username: string,
  password: string,
): string => {


  if (!username || !password) {
    return `mongodb://${host}:${port}/${databaseName}?authSource=admin`;
  }

  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=admin`;
};


