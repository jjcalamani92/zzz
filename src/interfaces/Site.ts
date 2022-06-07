export interface Site {
  _id: string;
  title: string;
  domain: string;
  logo: string;
  numberPhone: string;
  address: string;
  type: string;
  categories: Category[];
  pages: Page[];
  status: boolean;
}

export interface Category {
  name: string;
  href: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  featured: Featured[];
  sections: Section[];
}

export interface Featured {
  category: string;
  name: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
}

export interface Section {
  category: string;
  section: string;
  name: string;
  href: string;
  items: Item[];
}

export interface Item {
  category: string;
  section: string;
  description: string;
  name: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
}

export interface Page {
  category: string;
  section: string;
  name: string;
  href: string;
}
