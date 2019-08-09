import Category from "./Category";

class CategoryRepository {

  constructor() {
    const categories = [
      { name: 'fun', tags: ["non-essential"] },
      { name: 'groceries', tags: ["essential"] },
      { name: 'travel', tags: ["non-essential"] },
      { name: 'dining out', tags: ["non-essential"] },
      { name: 'rent', tags: ["essential"] },
      { name: 'utilities', tags: ["essential"] },
      { name: 'sports', tags: ["non-essential"] },
      { name: 'transportation', tags: ["essential"] },
      { name: 'lunch @ work', tags: ["essential"] },
      { name: 'children', tags: ["essential"] },
      { name: 'clothing', tags: ["non-essential"] },
      { name: 'unexpected', tags: ["essential"] },
    ].map((category, index) => {
      return new Category(index, category.name, category.tags)
    });

    this.categories = categories.sort((a, b) => a.name.localeCompare(b.name));
  }

  list() {
    return this.categories;
  }

  categoriesById() {
    return this.list().reduce((map, v) => map.set(v.id, v), new Map())
  }
}

export default CategoryRepository;
