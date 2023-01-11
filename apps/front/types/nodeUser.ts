export default interface NodeUser {
  users: {
    username: string;
    groups: string[];
  }[];
}
