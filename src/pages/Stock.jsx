import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Filter } from 'lucide-react';
import useStore from '../store/useStore';

const Stock = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [showLowStock, setShowLowStock] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Mobiles',
    quantity: 0,
    buyPrice: 0,
    sellPrice: 0,
    supplier: '',
  });

  const categories = ['All', 'Mobiles', 'Accessories', 'Charger', 'Cases', 'Headphones', 'Temper Glass', 'Spare', 'SIM'];

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || p.category === filterCategory;
    const matchesStock = !showLowStock || p.quantity <= 5;
    return matchesSearch && matchesCategory && matchesStock;
  });

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingId(product.id);
      setFormData(product);
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        category: 'Mobiles',
        quantity: 0,
        buyPrice: 0,
        sellPrice: 0,
        supplier: '',
      });
    }
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateProduct(editingId, formData);
    } else {
      addProduct(formData);
    }
    setShowModal(false);
  };

  const totalStockValue = filteredProducts.reduce((sum, p) => sum + p.quantity * p.buyPrice, 0);
  const totalSellValue = filteredProducts.reduce((sum, p) => sum + p.quantity * p.sellPrice, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            📦 Stock Management
          </h1>
          <p className="text-slate-600 mt-2">Manage your inventory</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg transition"
        >
          <Plus size={20} /> Add Product
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-effect rounded-[22px] p-6">
          <p className="text-slate-600 text-sm mb-1">Total Products</p>
          <p className="text-3xl font-bold text-slate-900">{filteredProducts.length}</p>
        </div>
        <div className="glass-effect rounded-[22px] p-6">
          <p className="text-slate-600 text-sm mb-1">Stock Buy Value</p>
          <p className="text-3xl font-bold text-blue-600">₹{(totalStockValue / 100000).toFixed(2)}L</p>
        </div>
        <div className="glass-effect rounded-[22px] p-6">
          <p className="text-slate-600 text-sm mb-1">Stock Sell Value</p>
          <p className="text-3xl font-bold text-emerald-600">₹{(totalSellValue / 100000).toFixed(2)}L</p>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-effect rounded-[22px] p-4 backdrop-blur-xl">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
          </div>

          {/* Category & Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filterCategory === cat
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white'
                    : 'bg-white/50 text-slate-700 hover:bg-white/70'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Low Stock Toggle */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="lowStock"
              checked={showLowStock}
              onChange={(e) => setShowLowStock(e.target.checked)}
              className="w-4 h-4 cursor-pointer"
            />
            <label htmlFor="lowStock" className="text-sm font-medium text-slate-700 cursor-pointer">
              Show only low stock (≤ 5 units)
            </label>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="glass-effect rounded-[22px] p-6 backdrop-blur-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b-2 border-slate-200">
            <tr className="text-slate-600">
              <th className="text-left py-3 font-semibold">Product Name</th>
              <th className="text-left py-3 font-semibold">Category</th>
              <th className="text-center py-3 font-semibold">Qty</th>
              <th className="text-right py-3 font-semibold">Buy Price</th>
              <th className="text-right py-3 font-semibold">Sell Price</th>
              <th className="text-right py-3 font-semibold">Margin</th>
              <th className="text-left py-3 font-semibold">Supplier</th>
              <th className="text-center py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => {
              const margin = ((product.sellPrice - product.buyPrice) / product.buyPrice * 100).toFixed(1);
              const isLowStock = product.quantity <= 5;
              return (
                <tr
                  key={product.id}
                  className={`border-b border-slate-100 hover:bg-white/50 transition ${
                    isLowStock ? 'bg-orange-50' : ''
                  }`}
                >
                  <td className="py-3 font-medium text-slate-900">{product.name}</td>
                  <td className="py-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                      {product.category}
                    </span>
                  </td>
                  <td className="py-3 text-center">
                    <span
                      className={`font-bold ${
                        isLowStock ? 'text-orange-600 bg-orange-100' : 'text-slate-900 bg-slate-100'
                      } px-3 py-1 rounded-lg`}
                    >
                      {product.quantity}
                    </span>
                  </td>
                  <td className="py-3 text-right font-semibold text-slate-900">₹{product.buyPrice}</td>
                  <td className="py-3 text-right font-semibold text-emerald-600">₹{product.sellPrice}</td>
                  <td className="py-3 text-right font-bold text-green-600">{margin}%</td>
                  <td className="py-3 text-slate-600 text-sm">{product.supplier}</td>
                  <td className="py-3 text-center space-x-2">
                    <button
                      onClick={() => handleOpenModal(product)}
                      className="p-2 hover:bg-blue-100 rounded-lg transition inline-block"
                      title="Edit"
                    >
                      <Edit2 size={16} className="text-blue-600" />
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="p-2 hover:bg-red-100 rounded-lg transition inline-block"
                      title="Delete"
                    >
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600">No products found</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass-effect rounded-[22px] p-8 max-w-md w-full backdrop-blur-xl border border-white/30">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              {editingId ? '✏️ Edit Product' : '➕ Add Product'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {categories.filter((c) => c !== 'All').map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Buy Price</label>
                  <input
                    type="number"
                    value={formData.buyPrice}
                    onChange={(e) => setFormData({ ...formData, buyPrice: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Sell Price</label>
                  <input
                    type="number"
                    value={formData.sellPrice}
                    onChange={(e) => setFormData({ ...formData, sellPrice: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Supplier</label>
                  <input
                    type="text"
                    value={formData.supplier}
                    onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                    className="w-full px-4 py-2 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 bg-slate-200 text-slate-900 rounded-xl font-semibold hover:bg-slate-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg transition"
                >
                  {editingId ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stock;
