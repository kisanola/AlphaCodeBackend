import bcrypt from 'bcrypt';

/**
 * Crypt
 */
class Crypt {
  /**
   * hash
   * @param {string} content - text to hash
   * @returns {string} returns hashed content
   */
  static hash(content: string): string {
    return bcrypt.hashSync(content, bcrypt.genSaltSync(10));
  }

  /**
   * compare
   * @param {string} hashed hashed string
   * @param {string} content Content to hash
   * @returns {Boolean} returns True or False
   */
  static compare(hashed: string, content: string): boolean {
    return bcrypt.compareSync(content, hashed);
  }
}

export default Crypt;
