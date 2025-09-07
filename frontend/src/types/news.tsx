export interface News {
  _id: string;
  title: string;
  content: string;
  author: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface NewsCreate {
  title: string;
  content: string;
  is_published: boolean;
}

export interface NewsUpdate {
  title?: string;
  content?: string;
  is_published?: boolean;
}