export const CATALOG_SECTIONS = [
  {
    id: 'electronics',
    title: 'Electronics',
    shortTitle: 'Electronics',
    description: 'Smartphones, laptops, headphones, smart gadgets',
    categories: [
      { id: 'smartphones', label: 'Smartphones' },
      { id: 'laptops', label: 'Laptops' },
      { id: 'headphones', label: 'Headphones' },
      { id: 'watches', label: 'Smart Watches' },
      { id: 'audio', label: 'Audio Systems' },
    ],
    brands: ['Apple', 'Sony', 'Samsung', 'ASUS', 'Marshall'],
  },
  {
    id: 'appliances',
    title: 'Home Appliances',
    shortTitle: 'Appliances',
    description: 'Coffee machines, vacuum cleaners, kitchen equipment',
    categories: [
      { id: 'kitchen_appliances', label: 'Kitchen Appliances' },
      { id: 'vacuum_cleaners', label: 'Vacuum Cleaners' },
    ],
    brands: ['DeLonghi', 'Philips', 'Dyson', 'Roborock'],
  },
  {
    id: 'groceries',
    title: 'Groceries & Food',
    shortTitle: 'Groceries',
    description: 'Coffee, dairy products, pasta, beverages',
    categories: [
      { id: 'coffee_tea', label: 'Coffee & Tea' },
      { id: 'dairy_eggs', label: 'Dairy & Cheese' },
      { id: 'grains_pasta', label: 'Pasta & Grains' },
      { id: 'beverages', label: 'Beverages' },
    ],
    brands: ['Lavazza', 'Halychyna', 'Komo', 'Barilla', 'Morshynska'],
  },
  {
    id: 'household',
    title: 'Household & Care',
    shortTitle: 'Household',
    description: 'Laundry pods, dishwashing and home cleaning supplies',
    categories: [{ id: 'cleaning', label: 'Cleaning & Laundry' }],
    brands: ['Ariel', 'Fairy'],
  },
  {
    id: 'tools',
    title: 'Tools & Auto',
    shortTitle: 'Tools',
    description: 'Power tools, drills and workshop equipment',
    categories: [{ id: 'power_tools', label: 'Power Tools' }],
    brands: ['Bosch'],
  },
];

export const ALL_CATEGORIES = CATALOG_SECTIONS.flatMap((sec) =>
  sec.categories.map((cat) => ({ ...cat, sectionId: sec.id })),
);

export const ALL_BRANDS = Array.from(
  new Set(CATALOG_SECTIONS.flatMap((sec) => sec.brands)),
);
