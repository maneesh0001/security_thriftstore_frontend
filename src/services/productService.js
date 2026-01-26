// FILE: productService.js

const mockProducts = [
  { id: 1, name: 'Classic T-Shirt', category: 'Women\'s Apparel', price: 79.80, imageUrl: 'https://placehold.co/100x100/f6ad55/4a2708?text=T-Shirt' },
  { id: 2, name: 'Button-Up Shirt', category: 'Men\'s Apparel', price: 76.89, imageUrl: 'https://placehold.co/100x100/a0aec0/ffffff?text=Shirt' },
  { id: 3, name: 'Comfort-Fit Pant', category: 'Kid\'s Apparel', price: 86.65, imageUrl: 'https://placehold.co/100x100/d69e2e/ffffff?text=Pant' },
  { id: 4, name: 'Wool Sweater', category: 'Men\'s Apparel', price: 56.07, imageUrl: 'https://placehold.co/100x100/4a5568/ffffff?text=Sweater' },
  { id: 5, name: 'Knit Sweater', category: 'Men\'s Apparel', price: 56.07, imageUrl: 'https://placehold.co/100x100/4a5568/ffffff?text=Sweater' },
  { id: 6, name: 'Light Jacket', category: 'Women\'s Apparel', price: 36.00, imageUrl: 'https://placehold.co/100x100/e2e8f0/4a5568?text=Jacket' },
  { id: 7, name: 'Half-Sleeve Shirt', category: 'Men\'s Apparel', price: 46.78, imageUrl: 'https://placehold.co/100x100/f7fafc/4a5568?text=Shirt' },
  { id: 8, name: 'Crewneck Half-Shirt', category: 'Sweater', price: 46.78, imageUrl: 'https://i.pinimg.com/736x/ec/aa/2f/ecaa2f92f9699272663b9bcd38ac4559.jpg' },
];

const productService = {
  getProducts: () => new Promise(resolve => setTimeout(() => resolve(mockProducts), 500))
};

export default productService;