// FILE: inventoryService.js

const mockInventoryAlerts = [
  { id: 1, productName: 'Classic T-Shirt', currentStock: 5, threshold: 10, status: 'Low Stock' },
  { id: 2, productName: 'Wool Sweater', currentStock: 0, threshold: 5, status: 'Out of Stock' },
  { id: 3, productName: 'Light Jacket', currentStock: 2, threshold: 6, status: 'Low Stock' },
  { id: 4, productName: 'Button-Up Shirt', currentStock: 15, threshold: 10, status: 'Sufficient' },
];

const inventoryService = {
  getAlerts: () => new Promise(resolve => setTimeout(() => resolve(mockInventoryAlerts), 500)),
};

export default inventoryService;
