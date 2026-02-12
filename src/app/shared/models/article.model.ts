export interface Article {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];

  //   constructor(
  //     id: string,
  //     title: string,
  //     shortDescription: string,
  //     description: string,
  //     image: string,
  //     author: string,
  //     createdAt: string,
  //     updatedAt: string,
  //     tags: string[]
  //   ) {
  //     this.id = id;
  //     this.title = title;
  //     this.author = author;
  //     this.shortDescription = shortDescription;
  //     this.description = description;
  //     this.image = image;
  //     this.createdAt = createdAt;
  //     this.updatedAt = updatedAt;
  //     this.tags = tags;
  //   }
}
