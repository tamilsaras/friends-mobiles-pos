// Mock data for the application
export const mockShopDetails = {
  shopName: 'Friends Mobiles',
  address: '2/111F, M.K. Complex, Canara Bank Near, Kallimandayam, Dindigul - 624616',
  centerId: 'FM-CENTER-001',
  centerBalance: 45890,
  phone: '+91 98765 43210',
  email: 'info@friendsmobiles.com',
};

export const mockUsers = [
  { id: 1, username: 'owner', password: 'friends123', role: 'owner', name: 'Owner' },
  { id: 2, username: 'staff', password: 'staff123', role: 'staff', name: 'Staff' },
];

export const mockProducts = [
  {
    id: 1,
    name: 'Redmi Note 13 Pro',
    category: 'Mobiles',
    quantity: 5,
    buyPrice: 18500,
    sellPrice: 20999,
    supplier: 'Xiaomi Dist',
    sku: 'RN13P-001',
  },
  {
    id: 2,
    name: 'Type-C Fast Cable',
    category: 'Accessories',
    quantity: 48,
    buyPrice: 80,
    sellPrice: 199,
    supplier: 'Local',
    sku: 'CABLE-TC-01',
  },
  {
    id: 3,
    name: 'iPhone 13 Back Panel',
    category: 'Spare',
    quantity: 12,
    buyPrice: 450,
    sellPrice: 899,
    supplier: 'Chennai Spare Mart',
    sku: 'IP13-BP-001',
  },
  {
    id: 4,
    name: 'Screen Protector',
    category: 'Accessories',
    quantity: 156,
    buyPrice: 20,
    sellPrice: 99,
    supplier: 'Local',
    sku: 'PROT-SCREEN-01',
  },
];

export const mockBills = [
  {
    billNo: 'BILL-2026-001',
    date: '2026-09-15',
    customerName: 'Karthik',
    phone: '+91 98765 43210',
    items: [{ productId: 1, qty: 1, price: 20999, discount: 0 }],
    subtotal: 20999,
    tax: 3780,
    total: 24779,
    paidAmount: 24779,
    dueAmount: 0,
    paymentMode: 'cash',
    status: 'paid',
  },
];

export const mockPurchases = [
  {
    invoiceNo: 'INV-2026-045',
    date: '2026-05-08',
    supplier: 'Chennai Spare Mart',
    items: [
      { productName: 'iPhone 13 Back Panel', qty: 10, rate: 450, total: 4500 },
      { productName: 'Type-C Cable', qty: 50, rate: 80, total: 4000 },
    ],
    subtotal: 8500,
    tax: 1020,
    total: 9520,
    paid: 5000,
    balance: 4520,
    status: 'partial',
  },
];

export const mockRecharges = [
  {
    id: 1,
    date: '2026-05-10',
    customerName: 'Rajesh',
    phone: '+91 98765 43210',
    operator: 'Jio Mobile',
    amount: 299,
    commission: 12,
    paymentMode: 'cash',
  },
];

export const mockTransfers = [
  {
    id: 1,
    date: '2026-05-10',
    sender: 'Ramesh Kumar',
    receiver: 'Suresh',
    amount: 5000,
    mode: 'GPay to GPay',
    commission: 30,
    customerCharge: 20,
  },
];

export const mockCustomers = [
  {
    id: 1,
    name: 'Karthik',
    phone: '+91 98765 43210',
    bills: 2,
    spent: 398,
    due: 799,
  },
  {
    id: 2,
    name: 'Priya',
    phone: '+91 98765 43211',
    bills: 1,
    spent: 199,
    due: 0,
  },
];

export const mockSecondHandPhones = [
  {
    id: 'SH-P1',
    type: 'purchase',
    model: 'iPhone 12 128GB Blue',
    imei: '352756089123456',
    condition: 'good',
    buyPrice: 22000,
    sellPrice: null,
    profit: null,
    seller: 'Raju Kumar',
    sellerPhone: '+91 98765 43210',
    sellerAddress: 'Main Road, Kallimandayam',
    buyer: null,
    buyerPhone: null,
    buyerAddress: null,
    documents: ['Bill Box', 'Original Battery 87%', 'ID Verified'],
    warranty: null,
    date: '2026-05-08',
  },
  {
    id: 'SH-S1',
    type: 'sale',
    model: 'Redmi Note 11 Pro 6/128',
    imei: '352756089123457',
    condition: 'excellent',
    buyPrice: 8500,
    sellPrice: 10999,
    profit: 2499,
    seller: 'Previous Owner',
    sellerPhone: '+91 98765 43210',
    sellerAddress: 'Dindigul',
    buyer: 'Suresh Babu',
    buyerPhone: '+91 98765 43212',
    buyerAddress: 'Canara Bank Opp, Kallimandayam',
    documents: ['Bill Verified'],
    warranty: '7 Days Checking Warranty',
    date: '2026-05-09',
  },
];

export const mockServices = [
  {
    id: 'J101',
    customerName: 'Manoj',
    phone: '+91 98765 43210',
    model: 'Redmi Note 12',
    issue: 'Display Broken (fell from bike)',
    estimatedCharge: 2500,
    advancePayment: 500,
    status: 'inRepair',
    deliveryDate: '2026-05-12',
    receivedDate: '2026-05-10',
  },
];

export const mockDues = [
  {
    id: 1,
    name: 'Supplier 1',
    type: 'supplier',
    phone: '+91 98765 43210',
    totalDue: 5000,
    paid: 2500,
    balance: 2500,
    status: 'partial',
    lastTransaction: '2026-05-10',
  },
];

export const mockOtherIncome = [
  {
    id: 1,
    date: '2026-05-10',
    description: 'Songs Copy 32GB',
    customerName: 'Karthik',
    amount: 200,
    paymentMode: 'cash',
  },
];

export const mockExpenses = [
  {
    id: 1,
    date: '2026-05-10',
    category: 'Rent',
    amount: 5000,
    description: 'Monthly shop rent',
    paymentMode: 'cash',
  },
];

export const mockWhatsAppTemplates = {
  tamil: 'Vanakkam {customer} 🙏, Friends Mobiles ku vanthathukku Nandri! Bill {billNo} : {amount} Shop: {shop} Meendum Varuga! ❤️',
  english: 'Hello {customer} 🙏, Thank you for visiting {shop}! Bill {billNo} Amount: {amount}. Visit Again! ❤️',
};
