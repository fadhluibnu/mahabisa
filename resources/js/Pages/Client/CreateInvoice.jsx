import React, { useState } from 'react';
import ClientLayout from './Components/ClientLayout';
import { FaArrowLeft, FaPlus, FaTrash } from 'react-icons/fa';
import { Link } from '@inertiajs/react';

const CreateInvoice = () => {
  // State for invoice form
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
    projectId: '',
    freelancerId: '',
    issueDate: new Date().toISOString().substr(0, 10),
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
      .toISOString()
      .substr(0, 10),
    items: [{ description: '', quantity: 1, rate: 0, amount: 0 }],
    notes: '',
    paymentTerms: 'Pembayaran dalam 14 hari',
    subtotal: 0,
    tax: 0,
    total: 0,
  });

  // Dummy data for projects and freelancers (in a real app, this would come from the backend)
  const projects = [
    { id: 1, name: 'Website Development' },
    { id: 2, name: 'Logo Design' },
    { id: 3, name: 'Content Writing' },
    { id: 4, name: 'Mobile App Development' },
    { id: 5, name: 'SEO Optimization' },
  ];

  const freelancers = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Mike Johnson' },
    { id: 4, name: 'Sarah Williams' },
    { id: 5, name: 'David Brown' },
  ];

  // Add item row
  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [
        ...invoiceData.items,
        { description: '', quantity: 1, rate: 0, amount: 0 },
      ],
    });
    calculateTotals();
  };

  // Remove item row
  const removeItem = index => {
    const updatedItems = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData({
      ...invoiceData,
      items: updatedItems,
    });
    calculateTotals(updatedItems);
  };

  // Handle item change
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...invoiceData.items];
    updatedItems[index][field] = value;

    // Auto-calculate amount
    if (field === 'quantity' || field === 'rate') {
      updatedItems[index].amount =
        updatedItems[index].quantity * updatedItems[index].rate;
    }

    setInvoiceData({
      ...invoiceData,
      items: updatedItems,
    });

    calculateTotals(updatedItems);
  };

  // Calculate subtotal, tax, and total
  const calculateTotals = (items = invoiceData.items) => {
    const subtotal = items.reduce(
      (sum, item) => sum + (parseFloat(item.amount) || 0),
      0
    );
    const tax = subtotal * 0.11; // 11% tax rate (PPN in Indonesia)
    const total = subtotal + tax;

    setInvoiceData(prev => ({
      ...prev,
      subtotal,
      tax,
      total,
    }));
  };

  // Handle form field changes
  const handleChange = e => {
    const { name, value } = e.target;
    setInvoiceData({
      ...invoiceData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = e => {
    e.preventDefault();
    // In a real app, you would submit this to the server
    console.log('Submitting invoice:', invoiceData);
    // Then redirect to the invoices page
    // window.location.href = '/client/payments';
  };

  // Format currency
  const formatCurrency = amount => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount);
  };

  return (
    <ClientLayout>
      <div className='container mx-auto px-4 py-8'>
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center'>
            <Link
              href='/client/payments'
              className='mr-4 text-gray-600 hover:text-gray-900'
            >
              <FaArrowLeft />
            </Link>
            <h1 className='text-2xl font-bold text-gray-800'>
              Create New Invoice
            </h1>
          </div>
          <div className='flex space-x-3'>
            <button
              type='button'
              className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50'
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
            <button
              type='button'
              className='px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700'
              onClick={handleSubmit}
            >
              Save Invoice
            </button>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
          <form onSubmit={handleSubmit}>
            <div className='p-6 border-b border-gray-200'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <h2 className='text-lg font-medium text-gray-900 mb-4'>
                    Invoice Details
                  </h2>

                  <div className='mb-4'>
                    <label
                      htmlFor='invoiceNumber'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      Invoice Number
                    </label>
                    <input
                      type='text'
                      id='invoiceNumber'
                      name='invoiceNumber'
                      value={invoiceData.invoiceNumber}
                      onChange={handleChange}
                      className='w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      readOnly
                    />
                  </div>

                  <div className='mb-4'>
                    <label
                      htmlFor='projectId'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      Project
                    </label>
                    <select
                      id='projectId'
                      name='projectId'
                      value={invoiceData.projectId}
                      onChange={handleChange}
                      className='w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      required
                    >
                      <option value=''>Select Project</option>
                      {projects.map(project => (
                        <option key={project.id} value={project.id}>
                          {project.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className='mb-4'>
                    <label
                      htmlFor='freelancerId'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      Freelancer
                    </label>
                    <select
                      id='freelancerId'
                      name='freelancerId'
                      value={invoiceData.freelancerId}
                      onChange={handleChange}
                      className='w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      required
                    >
                      <option value=''>Select Freelancer</option>
                      {freelancers.map(freelancer => (
                        <option key={freelancer.id} value={freelancer.id}>
                          {freelancer.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <h2 className='text-lg font-medium text-gray-900 mb-4'>
                    Dates
                  </h2>

                  <div className='mb-4'>
                    <label
                      htmlFor='issueDate'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      Issue Date
                    </label>
                    <input
                      type='date'
                      id='issueDate'
                      name='issueDate'
                      value={invoiceData.issueDate}
                      onChange={handleChange}
                      className='w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      required
                    />
                  </div>

                  <div className='mb-4'>
                    <label
                      htmlFor='dueDate'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      Due Date
                    </label>
                    <input
                      type='date'
                      id='dueDate'
                      name='dueDate'
                      value={invoiceData.dueDate}
                      onChange={handleChange}
                      className='w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      required
                    />
                  </div>

                  <div className='mb-4'>
                    <label
                      htmlFor='paymentTerms'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      Payment Terms
                    </label>
                    <input
                      type='text'
                      id='paymentTerms'
                      name='paymentTerms'
                      value={invoiceData.paymentTerms}
                      onChange={handleChange}
                      className='w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Invoice Items */}
            <div className='p-6 border-b border-gray-200'>
              <h2 className='text-lg font-medium text-gray-900 mb-4'>
                Invoice Items
              </h2>

              <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead>
                    <tr>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Description
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Quantity
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Rate (Rp)
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Amount (Rp)
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {invoiceData.items.map((item, index) => (
                      <tr key={index}>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <input
                            type='text'
                            value={item.description}
                            onChange={e =>
                              handleItemChange(
                                index,
                                'description',
                                e.target.value
                              )
                            }
                            className='w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                            placeholder='Item description'
                            required
                          />
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <input
                            type='number'
                            value={item.quantity}
                            onChange={e =>
                              handleItemChange(
                                index,
                                'quantity',
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className='w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                            min='1'
                            required
                          />
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <input
                            type='number'
                            value={item.rate}
                            onChange={e =>
                              handleItemChange(
                                index,
                                'rate',
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className='w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                            min='0'
                            required
                          />
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap font-medium'>
                          {formatCurrency(item.amount)}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                          {invoiceData.items.length > 1 && (
                            <button
                              type='button'
                              onClick={() => removeItem(index)}
                              className='text-red-600 hover:text-red-900'
                            >
                              <FaTrash />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className='mt-4'>
                <button
                  type='button'
                  onClick={addItem}
                  className='inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  <FaPlus className='mr-2' /> Add Item
                </button>
              </div>
            </div>

            {/* Invoice Totals */}
            <div className='p-6 border-b border-gray-200'>
              <div className='md:w-1/2 ml-auto'>
                <div className='flex justify-between py-2'>
                  <span className='text-gray-600'>Subtotal:</span>
                  <span className='font-medium'>
                    {formatCurrency(invoiceData.subtotal)}
                  </span>
                </div>
                <div className='flex justify-between py-2 border-b border-gray-200'>
                  <span className='text-gray-600'>Tax (11%):</span>
                  <span className='font-medium'>
                    {formatCurrency(invoiceData.tax)}
                  </span>
                </div>
                <div className='flex justify-between py-4 text-lg font-bold'>
                  <span>Total:</span>
                  <span>{formatCurrency(invoiceData.total)}</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className='p-6'>
              <div className='mb-4'>
                <label
                  htmlFor='notes'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Notes
                </label>
                <textarea
                  id='notes'
                  name='notes'
                  rows={3}
                  value={invoiceData.notes}
                  onChange={handleChange}
                  className='w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  placeholder='Any additional notes for the client'
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </ClientLayout>
  );
};

export default CreateInvoice;
