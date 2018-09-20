import Category from "./Category";

class CategoryRepository {

  constructor() {
    const categories = [
      'fun',
      'groceries',
      'travel',
      'dining out',
      'rent',
      'home expense',
      'sports',
      'transportation',
      'lunch @ work',
    ].map((name, index) => {
      return new Category(index, name)
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
