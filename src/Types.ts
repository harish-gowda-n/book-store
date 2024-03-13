export type Cover = {
  key: string;
  title: string;
  edition_count: number;
  cover_id: number;
  cover_edition_key: string;
  subject: string[];
  ia_collection: string[];
  lendinglibrary: boolean;
  printdisabled: boolean;
  lending_edition: string;
  lending_identifier: string;
  authors: Author[];
  first_publish_year: number;
  ia: string;
  public_scan: boolean;
  has_fulltext: boolean;
  // //For local use
  // is_favourite: boolean;
}

interface Author {
  key: string;
  name: string;
}

export type CoverApiResponse = {
  key: string;
  name: string;
  subject_type: string;
  work_count: number;
  works: Cover[];
}