import * as bcrypt from 'bcrypt';

// 단방향 암호화를 위해 만들어진 해시 함수
export function encodePassword(rawPassword: string) {
  const saltRounds = 12;
  const SALT = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(rawPassword, SALT);
}
// 비밀번호 comparison
export function comparePasswords(rawPassword: string, hash: string) {
  return bcrypt.compareSync(rawPassword, hash);
}