export interface Todo {
  id: string;
  fields: { Done: boolean | undefined; Name: string; Who: string };
  createdTime: string;
}
