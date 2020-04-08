// Search with 'tutorial-branding' will return
// ['tutorial-branding', 'tutorial']
export const findParentCategories = (categoryId, siteStructure) => {
  const find = (subStructure, idToFind) => {
    const { subcategories = [], id } = subStructure;
    let result;

    if (id === idToFind) return [id];

    const categoryContainsId = subcategories.some(c => {
      result = find(c, idToFind);
      return result.length > 0;
    });

    return categoryContainsId ? [...result, id] : [];
  };

  return find({ id: null, subcategories: siteStructure }, categoryId).filter(
    c => c !== null
  );
};

// Search with 'tutorial-branding' will return category object:
// { id: 'tutorial', /* etc. */ }
export const findMainBranch = (categoryId, siteStructure) => {
  const find = (categoryId, siteStructure) => {
    return siteStructure.find(c => {
      const subcategories = c.subcategories || [];
      const findFromSubcategories = subcategories
        ? find(categoryId, subcategories)
        : false;
      return c.id === categoryId || findFromSubcategories;
    });
  };
  return find(categoryId, siteStructure);
};

// Search with 'tutorial-branding' will return category object:
// { id: 'tutorial-branding', /* etc. */ }
export const findCategory = (categoryToFind, siteStructure) => {
  let category = null;

  const find = (categoryToFind, branch) => {
    const found = branch.id === categoryToFind;
    if (found) {
      category = branch;
    }
    return found
      ? true
      : branch.subcategories
      ? branch.subcategories.find(c => find(categoryToFind, c))
      : false;
  };

  const tree = { id: null, subcategories: siteStructure };
  find(categoryToFind, tree);
  return category;
};

export const flattenSubcategories = ({ id, subcategories = [] }) => {
  const subcategoryReducer = (acc, cat) => [
    ...acc,
    ...flattenSubcategories(cat),
  ];
  return subcategories.reduce(subcategoryReducer, [id]);
};

export const findSortingArrays = (category, siteStructure) => {
  const mainBranch = findMainBranch(category, siteStructure);
  const flattenedSubtree = flattenSubcategories(mainBranch);
  const sortingArrayReducer = (arrs, cat) => {
    const categoryBranch = findCategory(cat, siteStructure);
    const sortingArr =
      categoryBranch && categoryBranch.sortingArray
        ? categoryBranch.sortingArray
        : [];
    return [...arrs, ...sortingArr];
  };

  return flattenedSubtree.reduce(sortingArrayReducer, []);
};
