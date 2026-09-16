// Local storage utility functions
const STORAGE_KEYS = {
  AUTH: 'fm_auth',
  PRODUCTS: 'fm_products',
  BILLS: 'fm_bills',
  PURCHASES: 'fm_purchases',
  RECHARGES: 'fm_recharges',
  TRANSFERS: 'fm_transfers',
  CUSTOMERS: 'fm_customers',
  SERVICES: 'fm_services',
  SECOND_HAND: 'fm_second_hand',
  DUES: 'fm_dues',
  EXPENSES: 'fm_expenses',
  OTHER_INCOME: 'fm_other_income',
  SHOP_DETAILS: 'fm_shop_details',
  SETTINGS: 'fm_settings',
};

export const storage = {
  // Auth
  setAuth: (auth) => localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(auth)),
  getAuth: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.AUTH)),
  clearAuth: () => localStorage.removeItem(STORAGE_KEYS.AUTH),

  // Products
  setProducts: (products) => localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products)),
  getProducts: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS)) || [],
  addProduct: (product) => {
    const products = storage.getProducts();
    products.push(product);
    storage.setProducts(products);
  },
  updateProduct: (id, updatedProduct) => {
    const products = storage.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index > -1) {
      products[index] = { ...products[index], ...updatedProduct };
      storage.setProducts(products);
    }
  },
  deleteProduct: (id) => {
    const products = storage.getProducts().filter(p => p.id !== id);
    storage.setProducts(products);
  },

  // Bills
  setBills: (bills) => localStorage.setItem(STORAGE_KEYS.BILLS, JSON.stringify(bills)),
  getBills: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.BILLS)) || [],
  addBill: (bill) => {
    const bills = storage.getBills();
    bills.push(bill);
    storage.setBills(bills);
  },

  // Purchases
  setPurchases: (purchases) => localStorage.setItem(STORAGE_KEYS.PURCHASES, JSON.stringify(purchases)),
  getPurchases: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.PURCHASES)) || [],
  addPurchase: (purchase) => {
    const purchases = storage.getPurchases();
    purchases.push(purchase);
    storage.setPurchases(purchases);
  },

  // Recharges
  setRecharges: (recharges) => localStorage.setItem(STORAGE_KEYS.RECHARGES, JSON.stringify(recharges)),
  getRecharges: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.RECHARGES)) || [],
  addRecharge: (recharge) => {
    const recharges = storage.getRecharges();
    recharges.push(recharge);
    storage.setRecharges(recharges);
  },

  // Transfers
  setTransfers: (transfers) => localStorage.setItem(STORAGE_KEYS.TRANSFERS, JSON.stringify(transfers)),
  getTransfers: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.TRANSFERS)) || [],
  addTransfer: (transfer) => {
    const transfers = storage.getTransfers();
    transfers.push(transfer);
    storage.setTransfers(transfers);
  },

  // Customers
  setCustomers: (customers) => localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers)),
  getCustomers: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOMERS)) || [],

  // Services
  setServices: (services) => localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services)),
  getServices: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.SERVICES)) || [],
  addService: (service) => {
    const services = storage.getServices();
    services.push(service);
    storage.setServices(services);
  },
  updateService: (id, updatedService) => {
    const services = storage.getServices();
    const index = services.findIndex(s => s.id === id);
    if (index > -1) {
      services[index] = { ...services[index], ...updatedService };
      storage.setServices(services);
    }
  },

  // Second Hand Phones
  setSecondHandPhones: (phones) => localStorage.setItem(STORAGE_KEYS.SECOND_HAND, JSON.stringify(phones)),
  getSecondHandPhones: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.SECOND_HAND)) || [],
  addSecondHandPhone: (phone) => {
    const phones = storage.getSecondHandPhones();
    phones.push(phone);
    storage.setSecondHandPhones(phones);
  },

  // Dues
  setDues: (dues) => localStorage.setItem(STORAGE_KEYS.DUES, JSON.stringify(dues)),
  getDues: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.DUES)) || [],

  // Expenses
  setExpenses: (expenses) => localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses)),
  getExpenses: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.EXPENSES)) || [],
  addExpense: (expense) => {
    const expenses = storage.getExpenses();
    expenses.push(expense);
    storage.setExpenses(expenses);
  },

  // Other Income
  setOtherIncome: (income) => localStorage.setItem(STORAGE_KEYS.OTHER_INCOME, JSON.stringify(income)),
  getOtherIncome: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.OTHER_INCOME)) || [],
  addOtherIncome: (income) => {
    const items = storage.getOtherIncome();
    items.push(income);
    storage.setOtherIncome(items);
  },

  // Shop Details
  setShopDetails: (details) => localStorage.setItem(STORAGE_KEYS.SHOP_DETAILS, JSON.stringify(details)),
  getShopDetails: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.SHOP_DETAILS)),

  // Settings
  setSettings: (settings) => localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings)),
  getSettings: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS)),

  // Clear all data
  clearAll: () => {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
  },
};
