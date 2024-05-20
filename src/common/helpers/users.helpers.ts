import { v4 as uuidv4 } from 'uuid';

/**
 * Generate a unique alias based on firstName and lastName.
 * @param firstName - The user's first name
 * @param lastName - The user's last name
 * @returns A unique alias
 */

export const generateAlias = (firstName: string, lastName: string): string => {
  const randomSuffix = Math.floor(Math.random() * 10000).toString();
  return `${firstName.toLowerCase()}-${lastName.toLowerCase()}-${randomSuffix}`;
};

/**
 * Ensure alias is unique by appending a random UUID if necessary.
 * @param alias - The initial alias
 * @param findUserByAlias - Function to check if alias exists in the database
 * @returns A unique alias
 */

export const ensureAliasIsUnique = async (
  alias: string,
  findUserByAlias: (alias: string) => Promise<boolean>,
): Promise<string> => {
  let userExists = await findUserByAlias(alias);
  while (userExists) {
    alias = `${alias}-${uuidv4().split('-')[0]}`;
    userExists = await findUserByAlias(alias);
  }
  return alias;
};
