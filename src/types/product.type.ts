export interface Category {
  id: string;
  name?: string;
  parent: null | Category;
}

export type CurrentCategory = string | { parent: string; children: string[] };
