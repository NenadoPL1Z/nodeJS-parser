export type AuthUserFunction<T> = (login: string, password: string) => T;

export type GroupListItem = { text: string; value: string };
export type GroupListArr = GroupListItem[];
