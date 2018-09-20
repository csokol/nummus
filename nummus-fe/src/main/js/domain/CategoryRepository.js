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
      return {name: name, id: index}
    });

    this.categories = categories.sort((a, b) => a.name.localeCompare(b.name));
  }

  list() {
    return this.categories;
  }
}

export default CategoryRepository;
