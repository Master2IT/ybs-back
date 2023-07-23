export class CreateSubCategory {
  title: string;
  image: {
    src: string;
    alt: string;
  };
  categoryId: string;
  status?: string;
  categories: string[];
}
