/**
 * Format currency into Indonesian Rupiah format
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency
 */
export const formatCurrency = amount => {
  // Handle undefined or null
  if (amount === undefined || amount === null) {
    return 'Rp0';
  }

  // Format the number
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format date to Indonesian format
 * @param {string} dateString - ISO date string
 * @param {Object} options - Format options
 * @returns {string} Formatted date
 */
export const formatDate = (dateString, options = {}) => {
  if (!dateString) return '';

  const defaultOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    ...options,
  };

  return new Date(dateString).toLocaleDateString('id-ID', defaultOptions);
};

/**
 * Convert an activity type to a user-friendly string
 * @param {string} type - Activity type
 * @returns {string} Formatted activity type
 */
export const formatActivityType = type => {
  const activityTypes = {
    project_created: 'Proyek Baru Dibuat',
    project_status_updated: 'Status Proyek Diperbarui',
    proposal_accepted: 'Proposal Diterima',
    order_created: 'Pesanan Dibuat',
    payment_processed: 'Pembayaran Berhasil',
    review_submitted: 'Ulasan Diberikan',
    service_ordered: 'Jasa Dipesan',
    // Add more types as needed
  };

  return (
    activityTypes[type] ||
    (type
      ? type.replace(/_/g, ' ').charAt(0).toUpperCase() +
        type.replace(/_/g, ' ').slice(1)
      : 'Aktivitas')
  );
};
