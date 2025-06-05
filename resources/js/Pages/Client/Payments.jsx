import React, { useState } from 'react';
import ClientLayout from './Components/ClientLayout';
import { FaFileInvoiceDollar, FaHistory, FaCreditCard, FaDownload, FaEye, FaFilter } from 'react-icons/fa';
import { Link } from '@inertiajs/react';

const Payments = () => {
  const [activeTab, setActiveTab] = useState('invoices');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dummy data for invoices
  const invoices = [
    { id: 1, projectName: 'Website Development', freelancer: 'John Doe', amount: 750000, status: 'paid', date: '2025-05-25', invoiceNumber: 'INV-2025-001' },
    { id: 2, projectName: 'Logo Design', freelancer: 'Jane Smith', amount: 250000, status: 'pending', date: '2025-05-28', invoiceNumber: 'INV-2025-002' },
    { id: 3, projectName: 'Content Writing', freelancer: 'Mike Johnson', amount: 450000, status: 'paid', date: '2025-05-15', invoiceNumber: 'INV-2025-003' },
    { id: 4, projectName: 'Mobile App UI', freelancer: 'Sarah Williams', amount: 1200000, status: 'overdue', date: '2025-04-30', invoiceNumber: 'INV-2025-004' },
    { id: 5, projectName: 'SEO Optimization', freelancer: 'David Brown', amount: 350000, status: 'draft', date: '2025-06-01', invoiceNumber: 'INV-2025-005' },
  ];
  
  // Dummy data for payment history
  const paymentHistory = [
    { id: 1, projectName: 'Website Development', freelancer: 'John Doe', amount: 750000, method: 'Bank Transfer', date: '2025-05-25', transactionId: 'TRX-2025-001' },
    { id: 2, projectName: 'Content Writing', freelancer: 'Mike Johnson', amount: 450000, method: 'Credit Card', date: '2025-05-15', transactionId: 'TRX-2025-002' },
    { id: 3, projectName: 'Video Editing', freelancer: 'Lisa Chen', amount: 520000, method: 'E-Wallet', date: '2025-05-10', transactionId: 'TRX-2025-003' },
    { id: 4, projectName: 'Graphic Design', freelancer: 'Tom Wilson', amount: 180000, method: 'Bank Transfer', date: '2025-05-05', transactionId: 'TRX-2025-004' },
    { id: 5, projectName: 'Data Analysis', freelancer: 'Emma Garcia', amount: 890000, method: 'Credit Card', date: '2025-04-28', transactionId: 'TRX-2025-005' },
  ];
  
  // Dummy data for payment methods
  const paymentMethods = [
    { id: 1, name: 'BCA', type: 'Bank Transfer', last4: '6789', isDefault: true },
    { id: 2, name: 'Visa', type: 'Credit Card', last4: '4321', isDefault: false },
    { id: 3, name: 'GoPay', type: 'E-Wallet', last4: '5555', isDefault: false },
  ];
  
  // Filter invoices based on status and search query
  const filteredInvoices = invoices.filter(invoice => {
    const matchesStatus = selectedFilter === 'all' || invoice.status === selectedFilter;
    const matchesSearch = invoice.projectName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         invoice.freelancer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });
  
  // Filter payment history based on search query
  const filteredPaymentHistory = paymentHistory.filter(payment => {
    return payment.projectName.toLowerCase().includes(searchQuery.toLowerCase()) || 
           payment.freelancer.toLowerCase().includes(searchQuery.toLowerCase()) ||
           payment.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
           payment.method.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  // Get status color based on invoice status
  const getStatusColor = (status) => {
    switch(status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
  };
  
  return (
    <ClientLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Payments Management</h1>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Link 
              href="/client/create-invoice"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center justify-center"
            >
              <FaFileInvoiceDollar className="mr-2" />
              Create Invoice
            </Link>
            <button className="bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-md flex items-center justify-center">
              <FaDownload className="mr-2" />
              Export Report
            </button>
          </div>
        </div>
        
        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-gray-500 text-sm font-medium mb-1">Total Paid</h3>
            <p className="text-2xl font-semibold text-gray-800">Rp 3,750,000</p>
            <p className="text-green-600 text-sm mt-2">+12% from last month</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-gray-500 text-sm font-medium mb-1">Pending Payments</h3>
            <p className="text-2xl font-semibold text-gray-800">Rp 1,450,000</p>
            <p className="text-yellow-600 text-sm mt-2">3 invoices pending</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-gray-500 text-sm font-medium mb-1">Overdue</h3>
            <p className="text-2xl font-semibold text-gray-800">Rp 1,200,000</p>
            <p className="text-red-600 text-sm mt-2">1 invoice overdue</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-gray-500 text-sm font-medium mb-1">Available Balance</h3>
            <p className="text-2xl font-semibold text-gray-800">Rp 5,200,000</p>
            <p className="text-gray-600 text-sm mt-2">Last updated: Today</p>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('invoices')}
              className={`${
                activeTab === 'invoices'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <FaFileInvoiceDollar className="mr-2" />
              Invoices
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`${
                activeTab === 'history'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <FaHistory className="mr-2" />
              Payment History
            </button>
            <button
              onClick={() => setActiveTab('methods')}
              className={`${
                activeTab === 'methods'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <FaCreditCard className="mr-2" />
              Payment Methods
            </button>
          </nav>
        </div>
        
        {/* Search and filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {activeTab === 'invoices' && (
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-500" />
              <span className="text-sm text-gray-600">Filter:</span>
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Invoices</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          )}
        </div>
        
        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Invoices Tab */}
          {activeTab === 'invoices' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Invoice
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project/Service
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Freelancer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredInvoices.length > 0 ? (
                    filteredInvoices.map((invoice) => (
                      <tr key={invoice.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {invoice.invoiceNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {invoice.projectName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {invoice.freelancer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                          {formatCurrency(invoice.amount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(invoice.date).toLocaleDateString('id-ID', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(invoice.status)}`}>
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                          </span>
                        </td>                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                          <Link 
                            href={`/client/invoice/${invoice.id}`}
                            className="text-purple-600 hover:text-purple-800 inline-block"
                          >
                            <FaEye />
                          </Link>
                          <button className="text-blue-600 hover:text-blue-800">
                            <FaDownload />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                        No invoices found matching the criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          
          {/* Payment History Tab */}
          {activeTab === 'history' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project/Service
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Freelancer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Method
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPaymentHistory.length > 0 ? (
                    filteredPaymentHistory.map((payment) => (
                      <tr key={payment.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {payment.transactionId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.projectName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.freelancer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                          {formatCurrency(payment.amount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.method}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(payment.date).toLocaleDateString('id-ID', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </td>                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <Link 
                            href={`/client/invoice/${payment.id}`}
                            className="text-purple-600 hover:text-purple-800"
                          >
                            <FaEye />
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                        No payment history found matching the criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          
          {/* Payment Methods Tab */}
          {activeTab === 'methods' && (
            <div className="p-6">
              <div className="flex justify-end mb-6">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md">
                  Add Payment Method
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{method.name}</h3>
                        <p className="text-gray-600">{method.type}</p>
                      </div>
                      {method.type === 'Credit Card' ? (
                        <FaCreditCard className="text-2xl text-indigo-600" />
                      ) : method.type === 'E-Wallet' ? (
                        <FaHistory className="text-2xl text-indigo-600" />
                      ) : (
                        <FaFileInvoiceDollar className="text-2xl text-indigo-600" />
                      )}
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">
                      {method.type === 'Credit Card' ? 'Card ending in ' : 'Account ending in '}
                      <span className="font-medium">{method.last4}</span>
                    </p>
                    
                    {method.isDefault && (
                      <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full mb-4">
                        Default
                      </span>
                    )}
                    
                    <div className="flex justify-between pt-3 border-t border-gray-200">
                      <button className="text-sm text-gray-600 hover:text-gray-900">Edit</button>
                      {!method.isDefault && (
                        <button className="text-sm text-gray-600 hover:text-gray-900">Set as Default</button>
                      )}
                      {!method.isDefault && (
                        <button className="text-sm text-red-600 hover:text-red-800">Remove</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </ClientLayout>
  );
};

export default Payments;
