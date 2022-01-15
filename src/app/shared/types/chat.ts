// eslint-disable-next-line no-shadow
export enum ChatType {
  User,
  Group,
}

export interface Chat {
  id: string;
  link: string;
  name: string;
  bio: string;
  type: ChatType;
  createAt: string;
  updateAt: string;
}
