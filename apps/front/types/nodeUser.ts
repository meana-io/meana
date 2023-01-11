interface User {
  username: string;
  groups: string[];
}

export default interface NodeUser {
  users: User[];
}
