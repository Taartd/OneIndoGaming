
import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingCart, 
  Menu, 
  X, 
  ChevronRight, 
  Star, 
  ShieldCheck, 
  Clock, 
  CreditCard,
  MessageCircle,
  Search,
  Plus, 
  Minus,
  Trash2,
  Package,
  ArrowRight,
  Settings,
  LayoutDashboard,
  Users,
  LogOut,
  AlertCircle,
  Wallet,
  Home,
  HelpCircle,
  Lock,
  Edit2,
  Mail,
  Key,
  Upload,
  ImageIcon,
  Tag,
  Database,
  Download,
  RefreshCw,
  Copy,
  Check,
  CheckCircle2,
  XCircle,
  Layers,
  Heart,
  Send,
  Smartphone
} from 'lucide-react';
import { INITIAL_PRODUCTS, TESTIMONIALS, WHATSAPP_NUMBER } from './constants';
import { Product, Category, Order, OrderItem, Testimonial } from './types';

// --- Helper Functions ---

const calculateDiscountedPrice = (basePrice: number, discount: number) => {
  return basePrice * (1 - (discount || 0) / 100);
};

// --- Components ---

interface BadgeProps {
  children?: React.ReactNode;
  className?: string;
}

const Badge = ({ children, className = "" }: BadgeProps) => (
  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${className}`}>
    {children}
  </span>
);

interface SectionTitleProps {
  children?: React.ReactNode;
  subtitle?: string;
}

const SectionTitle = ({ children, subtitle }: SectionTitleProps) => (
  <div className="mb-8">
    <h2 className="text-2xl md:text-3xl font-extrabold text-white">{children}</h2>
    {subtitle && <p className="text-zinc-400 mt-2">{subtitle}</p>}
  </div>
);

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  key?: React.Key;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const isGamePass = product.category === 'Game Pass';
  const finalPrice = calculateDiscountedPrice(product.basePrice, product.discount);
  
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all group flex flex-col h-full text-left">
      <div className={`relative aspect-video overflow-hidden ${isGamePass ? 'bg-black flex items-center justify-center' : 'bg-zinc-800'}`}>
        <img 
          src={product.image} 
          alt={product.name} 
          className={`${isGamePass ? 'w-full h-full object-contain p-3' : 'w-full h-full object-cover'} group-hover:scale-105 transition-transform duration-500`}
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${product.name}&backgroundColor=09090b&fontFamily=Arial&bold=true`;
          }}
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <Badge className="bg-indigo-600 text-white">{product.platform}</Badge>
          {product.isFeatured && <Badge className="bg-amber-500 text-black">Hot</Badge>}
          {product.discount > 0 && <Badge className="bg-red-500 text-white">-{product.discount}%</Badge>}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider mb-1">{product.category}</div>
        <h3 className="font-bold text-lg text-white mb-2 line-clamp-1 group-hover:text-indigo-400 transition-colors">{product.name}</h3>
        <div className="flex items-center text-zinc-500 text-xs mb-4">
          <Clock size={14} className="mr-1" />
          <span>{product.deliveryTime}</span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-2 border-t border-zinc-800/50">
          <div>
            {product.discount > 0 ? (
              <>
                <div className="text-[10px] text-zinc-500 line-through">Rp {product.basePrice.toLocaleString('id-ID')}</div>
                <div className="text-xl font-black text-white">Rp {finalPrice.toLocaleString('id-ID')}</div>
              </>
            ) : (
              <div className="text-xl font-black text-white">Rp {product.basePrice.toLocaleString('id-ID')}</div>
            )}
          </div>
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-indigo-600 text-white p-2.5 rounded-xl hover:bg-indigo-500 transition-all active:scale-90"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Feedback Modal ---

const FeedbackModal = ({ onClose, onSubmit }: { onClose: () => void, onSubmit: (t: Omit<Testimonial, 'id'>) => void }) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    onSubmit({
      name: formData.get('name') as string,
      game: formData.get('game') as string,
      content: formData.get('content') as string,
      rating: rating
    });
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-[2rem] shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden flex flex-col max-h-[90vh]">
        <button onClick={onClose} className="absolute top-5 right-5 z-10 text-zinc-500 hover:text-white transition-colors bg-zinc-950/50 p-1 rounded-lg"><X size={20} /></button>
        
        <div className="p-6 md:p-8 overflow-y-auto scrollbar-hide">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-600/20 shrink-0"><Heart className="text-white" size={20} /></div>
            <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight">Kirim Feedback</h3>
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">Ulasan belanja Anda</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Nama Anda</label>
              <input name="name" required placeholder="Contoh: Budi Santoso" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm text-white outline-none focus:border-indigo-500 transition-all placeholder:text-zinc-700" />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Kategori Layanan</label>
              <select name="game" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm text-white outline-none focus:border-indigo-500 transition-all appearance-none">
                <option value="Game Pass">Game Pass</option>
                <option value="Joki Services">Joki Services</option>
                <option value="Game Accounts">Game Accounts</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div className="space-y-2 text-center py-3 bg-zinc-950/50 rounded-xl border border-zinc-800">
              <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Rating</label>
              <div className="flex justify-center gap-1.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button 
                    key={s} 
                    type="button" 
                    onClick={() => setRating(s)}
                    onMouseEnter={() => setHoverRating(s)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-all active:scale-90"
                  >
                    <Star 
                      size={24} 
                      className={`${(hoverRating || rating) >= s ? "fill-amber-500 text-amber-500" : "text-zinc-800"} transition-colors`} 
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Ulasan Anda</label>
              <textarea name="content" required placeholder="Tuliskan pengalaman belanja Anda..." className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm text-white outline-none focus:border-indigo-500 transition-all min-h-[100px] placeholder:text-zinc-700" />
            </div>

            <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/30 active:scale-95 flex items-center justify-center gap-2 mt-2">
              <Send size={16} /> KIRIM SEKARANG
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- Admin Components ---

const AdminPanel = ({ 
  products, 
  orders,
  testimonials,
  onAddProduct, 
  onUpdateProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onDeleteTestimonial,
  onLogout,
  onImportData
}: { 
  products: Product[], 
  orders: Order[],
  testimonials: Testimonial[],
  onAddProduct: (p: Product) => void,
  onUpdateProduct: (p: Product) => void,
  onDeleteProduct: (id: string) => void,
  onUpdateOrderStatus: (id: string, status: Order['status']) => void,
  onDeleteTestimonial: (id: string) => void,
  onLogout: () => void,
  onImportData: (data: string) => void
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'feedback' | 'system'>('dashboard');
  const [isAdding, setIsAdding] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [importString, setImportString] = useState('');
  
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    category: 'Game Pass',
    basePrice: 0,
    discount: 0,
    platform: '',
    deliveryTime: '',
    image: 'https://picsum.photos/seed/new/600/400',
    description: '',
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.basePrice !== undefined) {
      if (editingProduct) {
        onUpdateProduct({
          ...editingProduct,
          ...formData as Product,
        });
        setEditingProduct(null);
      } else {
        onAddProduct({
          ...formData as Product,
          id: Math.random().toString(36).substr(2, 9),
        });
      }
      setIsAdding(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Game Pass',
      basePrice: 0,
      discount: 0,
      platform: '',
      deliveryTime: '',
      image: 'https://picsum.photos/seed/new/600/400',
      description: '',
    });
  };

  const handleEditClick = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      category: p.category,
      basePrice: p.basePrice,
      discount: p.discount || 0,
      platform: p.platform,
      deliveryTime: p.deliveryTime,
      image: p.image,
      description: p.description,
    });
    setIsAdding(true);
    const formEl = document.getElementById('product-form-header');
    formEl?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingProduct(null);
    resetForm();
  };

  const handleExport = () => {
    const backupObj = { products, orders, testimonials };
    const dataStr = JSON.stringify(backupObj);
    navigator.clipboard.writeText(dataStr);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleImport = () => {
    if (importString.trim()) {
      onImportData(importString);
      setImportString('');
      alert('Data berhasil diimpor!');
    }
  };

  // Dynamic Stats Calculations
  const today = new Date().toISOString().split('T')[0];
  const completedOrders = orders.filter(o => o.status === 'Completed');
  const pendingOrdersCount = orders.filter(o => o.status === 'Pending').length;
  const todaySales = completedOrders
    .filter(o => o.createdAt.startsWith(today))
    .reduce((acc, o) => acc + o.totalPrice, 0);
  const totalUsers = new Set(orders.map(o => o.whatsapp)).size;

  return (
    <div className="flex flex-col md:flex-row gap-8 pb-20 text-left">
      <div className="w-full md:w-64 bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 h-fit sticky top-24 shadow-2xl">
        <h2 className="text-xl font-black mb-10 flex items-center gap-3 text-white uppercase tracking-tight">
          <Settings className="text-indigo-500" /> Admin Core
        </h2>
        <nav className="space-y-3">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
            { id: 'products', label: 'Kelola Produk', icon: <Package size={20} /> },
            { id: 'orders', label: 'Pesanan Masuk', icon: <ShoppingCart size={20} /> },
            { id: 'feedback', label: 'Feedback', icon: <Heart size={20} /> },
            { id: 'system', label: 'Sistem & Backup', icon: <Database size={20} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-[1.25rem] font-bold text-sm transition-all ${
                activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-[1.25rem] font-bold text-sm text-red-500 hover:bg-red-500/10 transition-colors mt-12"
          >
            <LogOut size={20} /> Logout
          </button>
        </nav>
      </div>

      <div className="flex-1 space-y-8">
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Penjualan Hari Ini', value: `Rp ${todaySales.toLocaleString('id-ID')}`, desc: `${completedOrders.length} Pesanan Sukses` },
              { label: 'Pesanan Aktif', value: pendingOrdersCount.toString(), desc: 'Perlu diproses segera' },
              { label: 'Total Pelanggan', value: totalUsers.toString(), desc: 'Database pelanggan unik' }
            ].map((stat, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2rem] shadow-xl text-left">
                <p className="text-zinc-500 text-xs font-black uppercase tracking-widest mb-2">{stat.label}</p>
                <p className="text-3xl font-black text-white mb-3">{stat.value}</p>
                <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-wider bg-indigo-500/10 w-fit px-2 py-1 rounded-lg">{stat.desc}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-zinc-800 flex items-center justify-between" id="product-form-header">
              <h3 className="font-black text-xl text-white">Database Produk</h3>
              <button 
                onClick={() => {
                   if (editingProduct) {
                     setEditingProduct(null);
                     resetForm();
                   }
                   setIsAdding(!isAdding);
                }}
                className={`${isAdding && !editingProduct ? 'bg-zinc-800 text-zinc-400' : 'bg-indigo-600 text-white'} hover:opacity-90 px-6 py-3 rounded-2xl text-xs font-black flex items-center gap-2 transition-all active:scale-95`}
              >
                {isAdding && !editingProduct ? <X size={18} /> : <Plus size={18} />} 
                {isAdding && !editingProduct ? 'TUTUP FORM' : 'TAMBAH PRODUK'}
              </button>
            </div>
            
            {isAdding && (
              <div className="p-8 bg-zinc-950/50 border-b border-zinc-800 animate-in slide-in-from-top duration-300">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-600 uppercase">Nama Produk</label>
                    <input name="name" required placeholder="Contoh: Joki CDID 100M" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 text-sm focus:border-indigo-500 outline-none text-white" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-600 uppercase">Kategori</label>
                    <select className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 text-sm focus:border-indigo-500 outline-none text-white" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as Category})}>
                      <option value="Game Pass">Game Pass</option>
                      <option value="Game Accounts">Game Accounts</option>
                      <option value="Joki Services">Joki Services</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-600 uppercase">Harga Normal (Rp)</label>
                    <input type="number" required placeholder="Harga" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 text-sm focus:border-indigo-500 outline-none text-white" value={formData.basePrice || ''} onChange={e => setFormData({...formData, basePrice: Number(e.target.value)})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-600 uppercase">Diskon (%)</label>
                    <select className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 text-sm focus:border-indigo-500 outline-none text-white" value={formData.discount || 0} onChange={e => setFormData({...formData, discount: Number(e.target.value)})}>
                      <option value="0">Tanpa Diskon</option>
                      {[...Array(19)].map((_, i) => <option key={i} value={(i + 1) * 5}>{(i + 1) * 5}%</option>)}
                      <option value="99">99%</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 space-y-4 pt-2">
                    <label className="text-[10px] font-black text-zinc-600 uppercase flex items-center gap-2"><ImageIcon size={12} /> Gambar Produk</label>
                    <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl group/img">
                      <div className="w-32 h-32 rounded-xl bg-black border border-zinc-800 flex items-center justify-center overflow-hidden shrink-0 shadow-2xl relative">
                        <img src={formData.image} alt="Preview" className="w-full h-full object-contain" onError={(e) => (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=Store&backgroundColor=09090b`} />
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity pointer-events-none"><Upload size={24} className="text-white" /></div>
                      </div>
                      <div className="flex-1 w-full space-y-4">
                        <label className="flex items-center gap-2 px-5 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-black cursor-pointer transition-all border border-zinc-700 w-fit">
                          <Upload size={14} /> UNGGAH FILE
                          <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                        </label>
                        <input placeholder="Atau Tempel URL Gambar" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs focus:border-indigo-500 outline-none text-white" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2 flex gap-4 pt-6">
                    <button type="submit" className="flex-1 bg-indigo-600 py-4 rounded-2xl font-black text-sm text-white hover:bg-indigo-700 transition-all">
                      {editingProduct ? 'UPDATE DATA' : 'SIMPAN DATA'}
                    </button>
                    <button type="button" onClick={handleCancel} className="px-10 py-4 border border-zinc-800 rounded-2xl font-black text-sm text-zinc-500 hover:bg-zinc-800 transition-all">BATAL</button>
                  </div>
                </form>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-zinc-950/50 text-zinc-500 text-[10px] font-black uppercase tracking-widest">
                  <tr>
                    <th className="px-8 py-5">Produk</th>
                    <th className="px-8 py-5">Kategori</th>
                    <th className="px-8 py-5 text-right">Harga Akhir</th>
                    <th className="px-8 py-5 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-zinc-800/20 transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <img src={p.image} className="w-10 h-10 rounded-lg object-contain bg-black" />
                          <span className="font-bold text-sm text-white">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5"><Badge className="bg-zinc-800 text-zinc-400">{p.category}</Badge></td>
                      <td className="px-8 py-5 text-right font-black text-sm text-indigo-400">Rp {calculateDiscountedPrice(p.basePrice, p.discount).toLocaleString('id-ID')}</td>
                      <td className="px-8 py-5">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => handleEditClick(p)} className="p-2 text-zinc-600 hover:text-indigo-400 transition-all" title="Edit"><Edit2 size={16} /></button>
                          <button onClick={() => onDeleteProduct(p.id)} className="p-2 text-zinc-600 hover:text-red-500 transition-all" title="Hapus"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-zinc-800 flex items-center justify-between">
              <h3 className="font-black text-xl text-white uppercase tracking-tight">Pesanan Masuk</h3>
            </div>
            {orders.length === 0 ? (
              <div className="p-20 text-center flex flex-col items-center gap-4 opacity-30">
                <ShoppingCart size={48} className="text-zinc-500" />
                <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">Belum ada pesanan masuk</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-zinc-950/50 text-zinc-500 text-[10px] font-black uppercase tracking-widest text-nowrap">
                    <tr>
                      <th className="px-8 py-5">Order ID</th>
                      <th className="px-8 py-5">Nama Lengkap</th>
                      <th className="px-8 py-5">Nomor WA</th>
                      <th className="px-8 py-5">Username Game</th>
                      <th className="px-8 py-5">Pembayaran</th>
                      <th className="px-8 py-5">Item</th>
                      <th className="px-8 py-5">Total</th>
                      <th className="px-8 py-5">Status</th>
                      <th className="px-8 py-5 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/50">
                    {orders.slice().reverse().map((o) => (
                      <tr key={o.id} className="hover:bg-zinc-800/10 transition-colors">
                        <td className="px-8 py-5 text-xs font-mono text-zinc-500">#{o.id}</td>
                        <td className="px-8 py-5 font-bold text-sm text-white">{o.customerName}</td>
                        <td className="px-8 py-5 text-xs text-zinc-400">{o.whatsapp}</td>
                        <td className="px-8 py-5 text-xs font-bold text-indigo-400">{o.gameUsername || '-'}</td>
                        <td className="px-8 py-5"><Badge className="bg-zinc-800 text-zinc-400">{o.paymentMethod || '-'}</Badge></td>
                        <td className="px-8 py-5 text-xs text-zinc-400 max-w-[200px] truncate">
                          {o.items.map(i => `${i.product.name} (x${i.quantity})`).join(', ')}
                        </td>
                        <td className="px-8 py-5 font-black text-sm text-white text-nowrap">Rp {o.totalPrice.toLocaleString('id-ID')}</td>
                        <td className="px-8 py-5">
                          <Badge className={`${
                            o.status === 'Completed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                            o.status === 'Cancelled' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 
                            'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                          }`}>
                            {o.status}
                          </Badge>
                        </td>
                        <td className="px-8 py-5">
                          {o.status === 'Pending' && (
                            <div className="flex items-center justify-center gap-3">
                              <button 
                                onClick={() => onUpdateOrderStatus(o.id, 'Completed')}
                                className="bg-green-600 hover:bg-green-500 text-white p-2.5 rounded-xl transition-all active:scale-90 shadow-lg shadow-green-600/20"
                                title="Approve"
                              >
                                <CheckCircle2 size={18} />
                              </button>
                              <button 
                                onClick={() => onUpdateOrderStatus(o.id, 'Cancelled')}
                                className="bg-red-600 hover:bg-red-500 text-white p-2.5 rounded-xl transition-all active:scale-90 shadow-lg shadow-red-600/20"
                                title="Decline"
                              >
                                <XCircle size={18} />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'feedback' && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-zinc-800">
              <h3 className="font-black text-xl text-white uppercase tracking-tight">Data Feedback Pelanggan</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-zinc-950/50 text-zinc-500 text-[10px] font-black uppercase tracking-widest">
                  <tr>
                    <th className="px-8 py-5">Nama Pelanggan</th>
                    <th className="px-8 py-5">Kategori Game</th>
                    <th className="px-8 py-5">Rating</th>
                    <th className="px-8 py-5">Isi Feedback</th>
                    <th className="px-8 py-5 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                  {testimonials.map((t) => (
                    <tr key={t.id} className="hover:bg-zinc-800/10 transition-colors">
                      <td className="px-8 py-5">
                        <div className="font-bold text-sm text-white">{t.name}</div>
                      </td>
                      <td className="px-8 py-5">
                        <Badge className="bg-zinc-800 text-zinc-400">{t.game}</Badge>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={10} className={i < t.rating ? "fill-amber-500 text-amber-500" : "text-zinc-800"} />
                          ))}
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <p className="text-xs text-zinc-400 italic line-clamp-1 max-w-xs">{t.content}</p>
                      </td>
                      <td className="px-8 py-5 text-center">
                        <button 
                          onClick={() => onDeleteTestimonial(t.id)}
                          className="p-2 text-zinc-600 hover:text-red-500 transition-all rounded-xl hover:bg-red-500/5"
                          title="Hapus Feedback"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {testimonials.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-8 py-20 text-center text-zinc-600 font-bold uppercase tracking-widest text-xs italic">Belum ada feedback dari pelanggan</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'system' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-500">
            <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-[2.5rem] shadow-2xl group">
              <Download className="text-indigo-500 mb-6" size={32} />
              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">Export Data</h3>
              <p className="text-zinc-500 text-sm mb-8 leading-relaxed">Backup seluruh data produk and pesanan Anda.</p>
              <button onClick={handleExport} className="w-full bg-zinc-950 border border-zinc-800 hover:border-indigo-500 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95">
                {copySuccess ? <Check size={18} className="text-green-500" /> : <Copy size={18} />} {copySuccess ? 'DISALIN' : 'COPY BACKUP'}
              </button>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-[2.5rem] shadow-2xl">
              <RefreshCw className="text-indigo-500 mb-6" size={32} />
              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">Import Data</h3>
              <p className="text-zinc-500 text-sm mb-6 leading-relaxed">Pulihkan data toko dari backup sebelumnya.</p>
              <textarea placeholder="Tempel backup di sini..." className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-xs font-mono text-indigo-400 outline-none focus:border-indigo-500 mb-6 min-h-[100px]" value={importString} onChange={(e) => setImportString(e.target.value)} />
              <button onClick={handleImport} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50" disabled={!importString.trim()}>PULIHKAN DATA</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- LoginPage Component ---
const LoginPage = ({ onLogin }: { onLogin: (email: string) => void }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'bluygalaxy@gmail.com') {
      onLogin(email);
    } else {
      alert('Akses Ditolak: Email tidak terdaftar sebagai administrator.');
    }
  };

  return (
    <div className="max-w-md mx-auto py-24 text-left animate-in fade-in zoom-in duration-500">
      <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-[2.5rem] shadow-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-indigo-600 p-2.5 rounded-xl"><Lock className="text-white" size={24} /></div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Admin Login</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Email Address</label>
            <input 
              type="email" 
              required 
              placeholder="admin@example.com" 
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-5 text-white outline-none focus:border-indigo-500 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all active:scale-95 shadow-2xl shadow-indigo-600/30">
            Masuk ke Panel
          </button>
        </form>
      </div>
    </div>
  );
};

// --- HomePage Component ---
const HomePage = ({ products, testimonials, onAddToCart, onCategorySelect }: { products: Product[], testimonials: Testimonial[], onAddToCart: (p: Product) => void, onCategorySelect: (c: Category) => void }) => {
  const featuredProducts = products.filter(p => p.isFeatured);

  return (
    <div className="space-y-24 pb-20 text-left">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[3rem] bg-indigo-600 p-8 md:p-20 group">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 -skew-x-12 translate-x-1/2 group-hover:translate-x-1/3 transition-transform duration-1000"></div>
        <div className="relative z-10 max-w-2xl">
          <Badge className="bg-white/20 text-white mb-6 backdrop-blur-md">Trusted Store No. 1</Badge>
          <h1 className="text-4xl md:text-7xl font-black text-white leading-[0.9] uppercase tracking-tighter mb-8">
            Upgrade Your <br />
            <span className="text-indigo-200">Gaming Lifestyle</span>
          </h1>
          <p className="text-indigo-100 text-lg md:text-xl font-medium mb-12 max-w-lg leading-relaxed">
            Dapatkan Game Pass, Joki, dan Akun Game premium dengan proses instan & harga paling kompetitif se-Indonesia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => onCategorySelect('Game Pass')} className="bg-white text-indigo-600 px-10 py-5 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-indigo-50 transition-all active:scale-95 flex items-center justify-center gap-2">
              Mulai Belanja <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => document.getElementById('testimonials-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-indigo-700/50 text-white border border-indigo-400/30 px-10 py-5 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-indigo-700 transition-all active:scale-95 backdrop-blur-sm"
            >
              Cek Testimoni
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section>
        <SectionTitle subtitle="Pilih jenis layanan yang Anda butuhkan">Kategori Layanan</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { id: 'Game Pass', title: 'Game Pass', icon: <Layers size={32} />, desc: 'Akses fitur premium game', color: 'bg-blue-600' },
            { id: 'Joki Services', title: 'Joki Services', icon: <Users size={32} />, desc: 'Bantuan profesional pro player', color: 'bg-emerald-600' },
            { id: 'Game Accounts', title: 'Game Accounts', icon: <Lock size={32} />, desc: 'Akun sultan siap pakai', color: 'bg-amber-600', disabled: true }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => !cat.disabled && onCategorySelect(cat.id as Category)}
              className={`group relative overflow-hidden bg-zinc-900 border border-zinc-800 p-10 rounded-[2.5rem] transition-all text-left ${cat.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-indigo-500/50 hover:-translate-y-2'}`}
            >
              <div className={`${cat.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">{cat.title}</h3>
              <p className="text-zinc-500 text-sm font-medium mb-8">{cat.desc}</p>
              {cat.disabled ? (
                <Badge className="bg-red-500/10 text-red-500 border border-red-500/20">Maintenance</Badge>
              ) : (
                <div className="flex items-center gap-2 text-indigo-500 text-xs font-black uppercase tracking-widest group-hover:gap-4 transition-all">
                  Lihat Produk <ChevronRight size={16} />
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex items-end justify-between mb-8">
          <SectionTitle subtitle="Layanan yang paling banyak dipesan minggu ini">Produk Terpopuler</SectionTitle>
          <button onClick={() => onCategorySelect('Game Pass')} className="hidden md:flex items-center gap-2 text-zinc-500 hover:text-white font-black text-[10px] uppercase tracking-widest transition-all mb-8">
            Lihat Semua <ArrowRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map(p => (
            <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>

      {/* Features/Trust */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-12 bg-zinc-900/50 border border-zinc-800 p-12 md:p-20 rounded-[3rem]">
        {[
          { icon: <ShieldCheck size={40} className="text-indigo-500" />, title: '100% Aman', desc: 'Sistem keamanan tingkat tinggi menjamin data akun Anda tetap terjaga.' },
          { icon: <Clock size={40} className="text-indigo-500" />, title: 'Proses Kilat', desc: 'Rata-rata pesanan diproses dalam waktu kurang dari 10 menit saja.' },
          { icon: <CreditCard size={40} className="text-indigo-500" />, title: 'Harga Terbaik', desc: 'Kami memberikan penawaran harga paling kompetitif di pasar Indonesia.' }
        ].map((f, i) => (
          <div key={i} className="text-center md:text-left space-y-6">
            <div className="w-fit mx-auto md:mx-0 p-4 bg-indigo-500/10 rounded-2xl">
              {f.icon}
            </div>
            <h3 className="text-xl font-black text-white uppercase tracking-tight">{f.title}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed font-medium">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Testimonials */}
      <section id="testimonials-section">
        <SectionTitle subtitle="Apa kata mereka tentang OneIndoGaming?">Testimoni Pelanggan</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.slice().reverse().map((t) => (
            <div key={t.id} className="bg-zinc-900 border border-zinc-800 p-10 rounded-[2.5rem] relative group animate-in slide-in-from-bottom duration-500">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className={i < t.rating ? "fill-amber-500 text-amber-500" : "text-zinc-800"} />)}
              </div>
              <p className="text-white font-medium text-lg leading-relaxed mb-8 italic">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-600/20">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-bold">{t.name}</p>
                  <p className="text-indigo-500 text-[10px] font-black uppercase tracking-widest">{t.game}</p>
                </div>
              </div>
              <div className="absolute top-10 right-10 text-zinc-800 group-hover:text-indigo-500/10 transition-colors">
                <MessageCircle size={64} />
              </div>
            </div>
          ))}
          {testimonials.length === 0 && (
            <div className="col-span-1 md:col-span-3 py-16 text-center border-2 border-dashed border-zinc-800 rounded-[2.5rem] text-zinc-600 uppercase font-black text-xs tracking-[0.4em]">Belum ada ulasan</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default function App() {
  const [activePage, setActivePage] = useState<'home' | 'category' | 'checkout' | 'confirmation' | 'admin' | 'policy' | 'login'>('home');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS);
  const [searchQuery, setSearchQuery] = useState('');
  const [orderData, setOrderData] = useState<Partial<Order>>({});

  useEffect(() => {
    const savedProducts = localStorage.getItem('oneindo_products_v4');
    const savedOrders = localStorage.getItem('oneindo_orders_v4');
    const savedTestimonials = localStorage.getItem('oneindo_testimonials_v4');
    if (savedProducts) setProducts(JSON.parse(savedProducts));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedTestimonials) setTestimonials(JSON.parse(savedTestimonials));
  }, []);

  const handleAddProduct = (p: Product) => {
    const updated = [p, ...products];
    setProducts(updated);
    localStorage.setItem('oneindo_products_v4', JSON.stringify(updated));
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    const updated = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
    setProducts(updated);
    localStorage.setItem('oneindo_products_v4', JSON.stringify(updated));
  };

  const handleDeleteProduct = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem('oneindo_products_v4', JSON.stringify(updated));
  };

  const handleUpdateOrderStatus = (id: string, status: Order['status']) => {
    const updated = orders.map(o => o.id === id ? { ...o, status } : o);
    setOrders(updated);
    localStorage.setItem('oneindo_orders_v4', JSON.stringify(updated));
  };

  const handleAddFeedback = (tData: Omit<Testimonial, 'id'>) => {
    const newFeedback: Testimonial = {
      ...tData,
      id: Math.random().toString(36).substr(2, 9),
    };
    const updated = [...testimonials, newFeedback];
    setTestimonials(updated);
    localStorage.setItem('oneindo_testimonials_v4', JSON.stringify(updated));
    setIsFeedbackModalOpen(false);
    alert('Terima kasih! Feedback Anda telah terkirim.');
  };

  const handleDeleteTestimonial = (id: string) => {
    const updated = testimonials.filter(t => t.id !== id);
    setTestimonials(updated);
    localStorage.setItem('oneindo_testimonials_v4', JSON.stringify(updated));
  };

  const handleImportData = (dataStr: string) => {
    try {
      const parsed = JSON.parse(dataStr);
      if (parsed.products) {
        setProducts(parsed.products);
        localStorage.setItem('oneindo_products_v4', JSON.stringify(parsed.products));
      }
      if (parsed.orders) {
        setOrders(parsed.orders);
        localStorage.setItem('oneindo_orders_v4', JSON.stringify(parsed.orders));
      }
      if (parsed.testimonials) {
        setTestimonials(parsed.testimonials);
        localStorage.setItem('oneindo_testimonials_v4', JSON.stringify(parsed.testimonials));
      }
    } catch (e) {
      alert('Gagal mengimpor data.');
    }
  };

  const handleAddToCart = (product: Product) => {
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(cart.map(item => item.product.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.product.id !== id));
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + (calculateDiscountedPrice(item.product.basePrice, item.product.discount) * item.quantity), 0);
  }, [cart]);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 6).toUpperCase(),
      customerName: data.customerName as string,
      whatsapp: data.whatsapp as string,
      gameUsername: data.username as string,
      paymentMethod: data.paymentMethod as string,
      items: [...cart],
      totalPrice: cartTotal,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem('oneindo_orders_v4', JSON.stringify(updatedOrders));

    const message = `Halo Admin OneIndoGaming.ID! Saya ingin memesan:\n\n` + 
      cart.map(item => `- ${item.product.name} (x${item.quantity})`).join('\n') +
      `\n\nTotal: Rp ${cartTotal.toLocaleString('id-ID')}\n` +
      `Order ID: #${newOrder.id}\n` +
      `Nama: ${newOrder.customerName}\n` +
      `WA: ${newOrder.whatsapp}\n` +
      `Username Game: ${newOrder.gameUsername || '-'}\n` +
      `Metode Pembayaran: ${newOrder.paymentMethod || '-'}\n\n` +
      `Mohon instruksi pembayarannya segera. Terima kasih!`;
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
    
    setOrderData(newOrder);
    setCart([]);
    setActivePage('confirmation');
  };

  const navigateTo = (page: any, cat: Category | null = null) => {
    if (page === 'admin') {
      if (userEmail === 'bluygalaxy@gmail.com') setActivePage('admin');
      else setActivePage('login');
    } else setActivePage(page);
    setSelectedCategory(cat);
    setSearchQuery('');
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim() || searchQuery === "/Admin Core/") return [];
    return products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [products, searchQuery]);

  return (
    <div className="min-h-screen text-zinc-300">
      <nav className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-2xl border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <button onClick={() => navigateTo('home')} className="flex items-center gap-3 group">
              <div className="bg-indigo-600 p-2.5 rounded-[1rem] group-hover:rotate-12 transition-all shadow-lg shadow-indigo-600/20 active:scale-95"><ShieldCheck className="text-white" size={24} /></div>
              <span className="text-xl font-black text-white uppercase tracking-tighter">OneIndoGaming<span className="text-indigo-500">.ID</span></span>
            </button>
            <div className="hidden lg:flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">
              <button onClick={() => navigateTo('home')} className={`hover:text-white transition-all ${activePage === 'home' ? 'text-white' : ''}`}>Beranda</button>
              <button onClick={() => navigateTo('policy')} className={`hover:text-white transition-all ${activePage === 'policy' ? 'text-white' : ''}`}>Kebijakan</button>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="hidden md:flex relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
              <input type="text" placeholder="Cari layanan..." className="bg-zinc-900/50 border border-zinc-800 rounded-2xl pl-12 pr-10 py-3 text-xs w-72 focus:border-indigo-500 outline-none text-white transition-all focus:bg-zinc-900" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <button onClick={() => setIsCartOpen(true)} className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-2xl relative active:scale-90 shadow-xl group hover:border-indigo-500 transition-all">
              <ShoppingCart size={22} className="text-white group-hover:text-indigo-400" />
              {cart.length > 0 && <span className="absolute -top-1.5 -right-1.5 bg-indigo-600 text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-4 border-zinc-950 shadow-lg">{cart.reduce((a, b) => a + b.quantity, 0)}</span>}
            </button>
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden bg-zinc-900 border border-zinc-800 p-3 rounded-2xl text-white active:scale-90"><Menu size={24} /></button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        {searchQuery === "/Admin Core/" ? (
          <div className="py-20 flex flex-col items-center animate-in fade-in zoom-in duration-500">
            <div className="bg-indigo-600 p-8 rounded-[2.5rem] mb-8 shadow-2xl shadow-indigo-600/30 animate-pulse"><Key size={64} className="text-white" /></div>
            <h3 className="text-4xl font-black text-white uppercase tracking-tight mb-4">Akses Core Konsol</h3>
            <p className="text-zinc-500 mb-10 text-center max-w-sm">Selamat datang, Administrator. Silakan login untuk mengelola OneIndoGaming Database.</p>
            <button onClick={() => navigateTo('admin')} className="bg-indigo-600 text-white px-16 py-5 rounded-[1.5rem] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-600/40 active:scale-95">Buka Database</button>
          </div>
        ) : searchQuery ? (
          <div className="pb-20 text-left animate-in slide-in-from-bottom-5 duration-500">
            <SectionTitle subtitle={`Ditemukan ${filteredProducts.length} layanan yang cocok`}>Hasil Pencarian: "{searchQuery}"</SectionTitle>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map(p => <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} />)}
              </div>
            ) : (
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-[2rem] p-20 text-center text-zinc-600 uppercase font-black tracking-widest text-sm italic">Produk tidak ditemukan</div>
            )}
          </div>
        ) : (
          <>
            {activePage === 'login' && <LoginPage onLogin={(email) => { setUserEmail(email); navigateTo('admin'); }} />}
            {activePage === 'home' && <HomePage products={products} testimonials={testimonials} onAddToCart={handleAddToCart} onCategorySelect={(c) => navigateTo('category', c)} />}
            {activePage === 'category' && (
              <div className="text-left pb-20 animate-in fade-in duration-500">
                <div className="flex items-center gap-2 mb-4 text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                  <button onClick={() => navigateTo('home')} className="hover:text-white">Beranda</button>
                  <ChevronRight size={12} />
                  <span className="text-zinc-400">{selectedCategory}</span>
                </div>
                <SectionTitle subtitle={selectedCategory === 'Game Accounts' ? 'Maaf, kategori ini sedang dalam pemeliharaan stok.' : `Layanan premium untuk ${selectedCategory}`}>{selectedCategory}</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.filter(p => p.category === selectedCategory).map(p => <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} />)}
                </div>
                {products.filter(p => p.category === selectedCategory).length === 0 && (
                  <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-20 text-center flex flex-col items-center gap-4">
                    <AlertCircle size={48} className="text-zinc-800" />
                    <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Stok Kosong</p>
                  </div>
                )}
              </div>
            )}
            {activePage === 'checkout' && (
              <div className="max-w-5xl mx-auto pb-24 text-left animate-in slide-in-from-bottom-5 duration-500">
                <SectionTitle subtitle="Lengkapi detail untuk memproses pesanan">Konfirmasi Checkout</SectionTitle>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  {/* Summary Section (Now Above Form on Mobile) */}
                  <div className="lg:col-span-5 lg:order-2">
                    <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-[2.5rem] sticky top-32 shadow-2xl">
                      <h3 className="font-black text-xl text-white uppercase mb-8 tracking-tight">Ringkasan Belanja</h3>
                      <div className="space-y-6 mb-8 max-h-96 overflow-y-auto pr-4 scrollbar-thin">
                        {cart.map(item => (
                          <div key={item.product.id} className="flex gap-4 group">
                            <div className="w-16 h-16 rounded-xl bg-black border border-zinc-800 p-1 shrink-0 flex items-center justify-center">
                              <img src={item.product.image} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex-1">
                              <p className="font-bold text-sm text-white line-clamp-1 group-hover:text-indigo-400 transition-colors">{item.product.name}</p>
                              <p className="text-xs text-zinc-500">{item.quantity}x @ Rp {calculateDiscountedPrice(item.product.basePrice, item.product.discount).toLocaleString('id-ID')}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-zinc-800 pt-8 flex justify-between items-end">
                        <span className="text-zinc-500 font-black text-xs uppercase tracking-widest mb-1">Total Pembayaran</span>
                        <span className="text-indigo-500 font-black text-3xl tracking-tighter">Rp {cartTotal.toLocaleString('id-ID')}</span>
                      </div>
                    </div>
                  </div>
                  {/* Data Form Section */}
                  <form onSubmit={handleCheckout} className="space-y-8 lg:col-span-7 lg:order-1">
                    <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-[2.5rem] space-y-6 shadow-2xl">
                      <h3 className="font-black text-xl text-white uppercase flex items-center gap-3"><Users size={22} className="text-indigo-500" /> Data Penerima</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Nama Lengkap</label>
                          <input name="customerName" required placeholder="Andi Pratama" className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-5 text-white outline-none focus:border-indigo-500 transition-all" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Nomor WhatsApp</label>
                          <input name="whatsapp" required placeholder="0812XXXXXXXX" className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-5 text-white outline-none focus:border-indigo-500 transition-all" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Username Game</label>
                          <input name="username" required placeholder="GamerPro2025" className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-5 text-white outline-none focus:border-indigo-500 transition-all" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                            <CreditCard size={12} /> Metode Pembayaran
                          </label>
                          <select name="paymentMethod" required className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-5 text-white outline-none focus:border-indigo-500 transition-all appearance-none">
                            <option value="Gopay">Gopay</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 text-white py-5 rounded-[1.5rem] font-black text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 active:scale-98 shadow-2xl shadow-indigo-600/30">
                      <MessageCircle size={24} /> Lanjut ke WhatsApp
                    </button>
                  </form>
                </div>
              </div>
            )}
            {activePage === 'confirmation' && (
              <div className="py-32 text-center max-w-2xl mx-auto flex flex-col items-center animate-in zoom-in-95 duration-700">
                <div className="bg-indigo-600 p-8 rounded-[2.5rem] mb-8 shadow-2xl shadow-indigo-600/40 rotate-3"><ShieldCheck size={72} className="text-white" /></div>
                <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-4">Pesanan Diproses</h2>
                <p className="text-zinc-500 mb-12 text-lg leading-relaxed">Halo <strong>{orderData.customerName}</strong>. ID Pesanan: <span className="text-indigo-400 font-mono">#{orderData.id}</span>. Database kami telah menerima pesanan Anda. Silakan selesaikan pembayaran via instruksi WhatsApp.</p>
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                  <button onClick={() => navigateTo('home')} className="bg-zinc-900 text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest border border-zinc-800 hover:bg-zinc-800 transition-all active:scale-95 shadow-xl">Kembali Belanja</button>
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" className="bg-green-600 text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-green-700 transition-all active:scale-95 shadow-xl shadow-green-600/20 flex items-center gap-2 justify-center">
                    <MessageCircle size={18} /> Hubungi Admin
                  </a>
                </div>
              </div>
            )}
            {activePage === 'admin' && <AdminPanel products={products} orders={orders} testimonials={testimonials} onAddProduct={handleAddProduct} onUpdateProduct={handleUpdateProduct} onDeleteProduct={handleDeleteProduct} onUpdateOrderStatus={handleUpdateOrderStatus} onDeleteTestimonial={handleDeleteTestimonial} onLogout={() => { setUserEmail(null); navigateTo('home'); }} onImportData={handleImportData} />}
            {activePage === 'policy' && (
              <div className="max-w-4xl mx-auto pb-24 text-left animate-in fade-in duration-500">
                <SectionTitle subtitle="Transparansi demi kenyamanan bersama">Legal & Kebijakan</SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-[2.5rem] shadow-2xl">
                    <h3 className="text-xl font-black text-white mb-6 uppercase tracking-tight">Ketentuan Layanan</h3>
                    <ul className="text-zinc-500 text-sm leading-relaxed space-y-4 list-disc pl-4">
                      <li>Layanan tersedia 24 jam dengan verifikasi manual setiap hari.</li>
                      <li>Pastikan data username/id game yang diinput benar 100%.</li>
                      <li>Pembayaran hanya dilayani melalui channel resmi (Gopay).</li>
                    </ul>
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-[2.5rem] shadow-2xl">
                    <h3 className="text-xl font-black text-white mb-6 uppercase tracking-tight">Kebijakan Refund</h3>
                    <ul className="text-zinc-500 text-sm leading-relaxed space-y-4 list-disc pl-4">
                      <li>Refund 100% jika produk tidak tersedia atau sistem gagal proses.</li>
                      <li>Tidak ada refund untuk kesalahan input data oleh pembeli.</li>
                      <li>Estimasi proses refund maksimal 2x24 jam kerja.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="bg-zinc-950 border-t border-zinc-900 pt-20 pb-10 text-left">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-600/20"><ShieldCheck className="text-white" size={24} /></div>
              <span className="text-2xl font-black text-white uppercase tracking-tighter">OneIndoGaming</span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed font-medium">Platform layanan game digital terpercaya No. 1 di Indonesia. Kecepatan, keamanan, dan harga murah adalah komitmen kami untuk semua gamer Indonesia.</p>
          </div>
          <div className="space-y-6">
            <h4 className="text-white font-black uppercase text-xs tracking-[0.3em]">Halaman Utama</h4>
            <ul className="text-zinc-500 text-xs font-bold uppercase space-y-4">
              <li><button onClick={() => navigateTo('home')} className="hover:text-indigo-500 transition-colors">Beranda Store</button></li>
              <li><button onClick={() => navigateTo('policy')} className="hover:text-indigo-500 transition-colors">Kebijakan Layanan</button></li>
              <li><button onClick={() => { setSearchQuery('/Admin Core/'); window.scrollTo(0, 0); }} className="hover:text-indigo-500/50 opacity-20 transition-colors">Admin Console</button></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-white font-black uppercase text-xs tracking-[0.3em]">Hubungi Kami</h4>
            <div className="flex gap-4">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl hover:border-green-500 hover:text-green-500 transition-all"><MessageCircle size={20} /></a>
              <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl text-zinc-500"><Users size={20} /></div>
            </div>
            <p className="text-[10px] text-zinc-700 font-black uppercase tracking-widest">Available 24/7 Support</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-20 pt-10 border-t border-zinc-900 flex justify-between items-center text-zinc-700 text-[9px] font-black uppercase tracking-[0.4em]">
          <span>© 2025 OneIndoGaming.ID Store</span>
          <span className="flex items-center gap-1">Secured by <ShieldCheck size={10} /></span>
        </div>
      </footer>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative w-full max-w-md bg-zinc-950 h-full border-l border-zinc-900 p-8 flex flex-col text-left animate-in slide-in-from-right duration-500 ease-out shadow-[-20px_0_50px_rgba(0,0,0,0.5)]">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
                <ShoppingCart className="text-indigo-500" /> Keranjang
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="bg-zinc-900 p-2.5 rounded-xl hover:text-white transition-all"><X className="text-zinc-500" size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-6 scrollbar-hide">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center gap-6 opacity-20 grayscale">
                  <ShoppingCart size={100} />
                  <p className="font-black text-4xl uppercase tracking-tighter">Kosong</p>
                </div>
              ) : 
                cart.map(item => (
                  <div key={item.product.id} className="flex gap-5 group animate-in slide-in-from-right-5 duration-300">
                    <div className="w-24 h-24 rounded-2xl bg-black border border-zinc-900 p-2 shrink-0 flex items-center justify-center">
                      <img src={item.product.image} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <p className="font-black text-white text-sm uppercase leading-tight group-hover:text-indigo-400 transition-colors">{item.product.name}</p>
                        <p className="text-[10px] text-zinc-600 font-bold uppercase mt-1">Rp {calculateDiscountedPrice(item.product.basePrice, item.product.discount).toLocaleString('id-ID')}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4 bg-zinc-900 rounded-xl p-1.5 px-4 border border-zinc-800 shadow-inner">
                          <button onClick={() => updateQuantity(item.product.id, -1)} className="text-zinc-500 hover:text-indigo-400 transition-all"><Minus size={14} /></button>
                          <span className="text-white font-black text-xs min-w-[20px] text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, 1)} className="text-zinc-500 hover:text-indigo-400 transition-all"><Plus size={14} /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.product.id)} className="text-zinc-800 hover:text-red-500 transition-all p-2 rounded-xl hover:bg-red-500/5"><Trash2 size={18} /></button>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
            {cart.length > 0 && (
              <div className="border-t border-zinc-900 pt-8 mt-8 space-y-6 bg-zinc-950">
                <div className="flex justify-between items-end">
                  <span className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em]">Subtotal Pesanan</span>
                  <span className="text-indigo-500 font-black text-3xl tracking-tighter">Rp {cartTotal.toLocaleString('id-ID')}</span>
                </div>
                <button onClick={() => { navigateTo('checkout'); setIsCartOpen(false); }} className="w-full bg-indigo-600 text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-600/30 active:scale-95 flex items-center justify-center gap-2">
                  Lanjut Pembayaran <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] flex">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="relative w-72 bg-zinc-950 h-full border-r border-zinc-900 p-8 flex flex-col text-left animate-in slide-in-from-left duration-500 ease-out">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-indigo-500 font-black text-sm uppercase tracking-widest">
                <ShieldCheck size={20} /> Menu
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="bg-zinc-900 p-2 rounded-lg text-zinc-500 hover:text-white transition-all"><X size={20} /></button>
            </div>

            {/* Mobile Search - 'Cari Layanan' */}
            <div className="mb-8 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
              <input 
                type="text" 
                placeholder="Cari layanan..." 
                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl pl-12 pr-4 py-3 text-xs focus:border-indigo-500 outline-none text-white transition-all" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
              />
            </div>

            <nav className="space-y-8 flex-1 overflow-y-auto scrollbar-hide">
              <div className="space-y-3">
                <p className="px-2 text-[10px] font-black text-zinc-700 uppercase tracking-[0.3em] mb-4">Navigasi Utama</p>
                <button onClick={() => navigateTo('home')} className="w-full flex items-center gap-4 px-4 py-4 font-black text-xs text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-2xl uppercase transition-all text-left">
                  <Home size={16} /> Beranda
                </button>
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsFeedbackModalOpen(true);
                  }}
                  className="w-full flex items-center gap-4 px-4 py-4 font-black text-xs text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-2xl uppercase transition-all text-left"
                >
                  <Heart size={16} /> Feedback
                </button>
                <button onClick={() => navigateTo('policy')} className="w-full flex items-center gap-4 px-4 py-4 font-black text-xs text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-2xl uppercase transition-all text-left">
                  <HelpCircle size={16} /> Kebijakan
                </button>
              </div>

              <div className="space-y-3">
                <p className="px-2 text-[10px] font-black text-zinc-700 uppercase tracking-[0.3em] mb-4">Kategori Layanan</p>
                <button 
                  onClick={() => navigateTo('category', 'Game Pass')} 
                  className="w-full flex items-center justify-between px-4 py-3 font-bold text-xs text-zinc-400 hover:text-indigo-400 hover:bg-zinc-900/50 rounded-xl transition-all"
                >
                  Game Pass <ChevronRight size={14} />
                </button>
                <button 
                  onClick={() => navigateTo('category', 'Joki Services')} 
                  className="w-full flex items-center justify-between px-4 py-3 font-bold text-xs text-zinc-400 hover:text-indigo-400 hover:bg-zinc-900/50 rounded-xl transition-all"
                >
                  Joki Services <ChevronRight size={14} />
                </button>
                <button 
                  onClick={() => navigateTo('category', 'Game Accounts')} 
                  className="w-full flex items-center justify-between px-4 py-3 font-bold text-xs text-zinc-600 cursor-not-allowed group"
                >
                  Game Accounts <Badge className="bg-red-500/10 text-red-500 border border-red-500/10 text-[8px]">Stok Kosong</Badge>
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Feedback Submission Modal */}
      {isFeedbackModalOpen && (
        <FeedbackModal 
          onClose={() => setIsFeedbackModalOpen(false)} 
          onSubmit={handleAddFeedback} 
        />
      )}

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-[55] flex flex-col gap-4">
        <a 
          href={`https://wa.me/${WHATSAPP_NUMBER}`} 
          target="_blank" 
          className="bg-green-500 hover:bg-green-600 text-white p-5 rounded-[2rem] shadow-2xl hover:scale-110 active:scale-95 transition-all shadow-green-500/30 group relative border-4 border-zinc-950"
        >
          <MessageCircle size={28} />
          <span className="absolute right-full mr-4 bg-zinc-900 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">Chat Support</span>
        </a>
      </div>
    </div>
  );
}
