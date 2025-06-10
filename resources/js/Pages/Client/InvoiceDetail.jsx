import React from 'react';
import ClientLayout from './Components/ClientLayout';
import { FaArrowLeft, FaDownload, FaPrint, FaShare, FaFileInvoiceDollar } from 'react-icons/fa';
import { Link } from '@inertiajs/react';

const InvoiceDetail = ({ invoiceId }) => {
  // In a real app, you would fetch the invoice data from the server
  // For now, we'll use dummy data
  const invoice = {
    id: invoiceId || 1,
    invoiceNumber: 'INV-2025-001',
    projectName: 'Website Development',
    freelancer: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+62 812-3456-7890',
      address: 'Jl. Sudirman No. 123, Jakarta Pusat, 10220'
    },
    client: {
      name: 'PT Maju Bersama',
      email: 'info@majubersama.com',
      phone: '+62 21-5555-6666',
      address: 'Jl. Gatot Subroto Kav. 56, Jakarta Selatan, 12950'
    },
    issueDate: '2025-05-20',
    dueDate: '2025-06-03',
    items: [
      {
        id: 1,
        description: 'Website UI Design',
        quantity: 1,
        rate: 350000,
        amount: 350000
      },
      {
        id: 2,
        description: 'Frontend Development',
        quantity: 1,
        rate: 250000,
        amount: 250000
      },
      {
        id: 3,
        description: 'Backend Integration',
        quantity: 1,
        rate: 150000,
        amount: 150000
      }
    ],
    subtotal: 750000,
    tax: 82500,
    total: 832500,
    status: 'paid',
    paymentMethod: 'Bank Transfer',
    paymentDate: '2025-05-25',
    notes: 'Terima kasih atas kerjasama yang baik. Pembayaran dapat dilakukan melalui transfer bank ke rekening yang tertera.'
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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

  return (
    <ClientLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link href="/client/payments" className="mr-4 text-gray-600 hover:text-gray-900">
              <FaArrowLeft />
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Invoice Detail</h1>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 flex items-center">
              <FaPrint className="mr-2" />
              Print
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 flex items-center">
              <FaDownload className="mr-2" />
              Download
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center">
              <FaShare className="mr-2" />
              Share
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Invoice Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start">
              <div className="mb-6 md:mb-0">
                <div className="flex items-center mb-3">
                  <FaFileInvoiceDollar className="text-indigo-600 text-3xl mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900">Invoice</h2>
                </div>
                <p className="text-gray-600 mb-1">{invoice.invoiceNumber}</p>
                <p className="text-gray-600 mb-1">Project: {invoice.projectName}</p>
                <div className="mt-3">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(invoice.status)}`}>
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-gray-600 mb-1">Issue Date: {formatDate(invoice.issueDate)}</p>
                <p className="text-gray-600 mb-1">Due Date: {formatDate(invoice.dueDate)}</p>
                {invoice.status === 'paid' && (
                  <p className="text-gray-600 mb-1">Payment Date: {formatDate(invoice.paymentDate)}</p>
                )}
                <p className="text-lg font-bold text-gray-900 mt-2">
                  Amount: {formatCurrency(invoice.total)}
                </p>
              </div>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">From</h3>
                <p className="font-medium text-gray-900">{invoice.freelancer.name}</p>
                <p className="text-gray-600">{invoice.freelancer.email}</p>
                <p className="text-gray-600">{invoice.freelancer.phone}</p>
                <p className="text-gray-600">{invoice.freelancer.address}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">To</h3>
                <p className="font-medium text-gray-900">{invoice.client.name}</p>
                <p className="text-gray-600">{invoice.client.email}</p>
                <p className="text-gray-600">{invoice.client.phone}</p>
                <p className="text-gray-600">{invoice.client.address}</p>
              </div>
            </div>
          </div>

          {/* Invoice Items */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Invoice Items</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rate
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {invoice.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {formatCurrency(item.rate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {formatCurrency(item.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Invoice Totals */}
          <div className="p-6 border-b border-gray-200">
            <div className="md:w-1/2 ml-auto">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">{formatCurrency(invoice.subtotal)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Tax (11%):</span>
                <span className="font-medium">{formatCurrency(invoice.tax)}</span>
              </div>
              <div className="flex justify-between py-4 text-lg font-bold">
                <span>Total:</span>
                <span>{formatCurrency(invoice.total)}</span>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Payment Information</h3>
            <p className="text-gray-600 mb-2">Method: {invoice.paymentMethod}</p>
            <p className="text-gray-600 mb-2">Status: 
              <span className={`ml-2 inline-block px-2 py-1 rounded-full text-xs ${getStatusColor(invoice.status)}`}>
                {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
              </span>
            </p>
            {invoice.status === 'paid' && (
              <p className="text-gray-600 mb-2">Payment Date: {formatDate(invoice.paymentDate)}</p>
            )}
          </div>

          {/* Notes */}
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Notes</h3>
            <p className="text-gray-600">{invoice.notes}</p>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default InvoiceDetail;
