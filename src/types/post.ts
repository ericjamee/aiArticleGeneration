export interface PostMeta {
  title: string;
  date: string;
  keyword: string;
  content: string;
  relatedTargets: string[];
}

export interface Post extends PostMeta {
  slug: string;
}
