# Payment Gateway & Transaction Flow Documentation

## Overview

This document outlines the payment and transaction flow for the Laravel 12 + Inertia.js + React.js freelance marketplace, including:

- Client payment processing (via Midtrans)
- Freelancer payment receiving and withdrawal
- Admin monitoring and configuration
- File delivery security (locked until payment)

## Payment Flow

### Client Payment Process

1. **Order Creation**:
   - Client places an order for a service
   - System generates unique order number
   - Client is redirected to payment page

2. **Payment Processing**:
   - Client selects payment method (credit card, bank transfer, e-wallet, QRIS, etc.)
   - Midtrans payment gateway processes transaction
   - System records payment status (pending, completed, failed)

3. **Payment Confirmation**:
   - Midtrans sends notification via webhook
   - System updates payment status and order status
   - Client and freelancer receive notifications

4. **File Access**:
   - Upon successful payment, delivered files are unlocked for client download
   - System tracks file downloads and access attempts

### Freelancer Payment Process

1. **Earnings Tracking**:
   - System tracks freelancer earnings in wallet
   - Earned amount is initially held as pending balance
   - Upon order completion, funds move to available balance

2. **Withdrawal Process**:
   - Freelancer creates payment method (bank account or e-wallet)
   - Freelancer requests withdrawal with selected payment method
   - Admin reviews and approves/rejects withdrawal request
   - System processes transfer based on admin action

3. **Transaction Logging**:
   - All earnings and withdrawals are logged as transactions
   - Freelancer can view complete transaction history

## Controller Structure

### Client-Side Controllers
- `OrderController`: Handles order creation and payment page
- `PaymentController`: Processes payments and Midtrans integration
- `FileController`: Controls file access based on payment status

### Freelancer-Side Controllers
- `FreelancerPaymentController`: Manages earnings, withdrawals, and payment methods
- `FreelancerWithdrawalController`: Handles historical withdrawal operations

### Admin-Side Controllers
- `AdminController`: Overall system configuration
- `AdminWithdrawalController`: Reviews and processes withdrawal requests

## Models

- `Order`: Core order information and status
- `Payment`: Payment details and status tracking
- `Transaction`: Comprehensive transaction logging
- `Wallet`: Freelancer balance management
- `Withdrawal`: Withdrawal requests and processing
- `PaymentMethod`: Freelancer withdrawal methods
- `File`: File management with access control
- `Setting`: System-wide configuration, including payment settings

## Security Features

1. **Dynamic Security Policies**:
   - Admin can configure security requirements (password complexity, etc.)
   - Policies enforced at registration and throughout the system

2. **Payment Security**:
   - Integration with Midtrans secure payment processing
   - Encrypted transaction and payment method storage
   - Automatic transaction verification

3. **File Security**:
   - Files are locked until payment is confirmed
   - Access attempts are logged for security monitoring
   - File delivery system prevents unauthorized access

## Configuration Options

Administrators can configure:
- Midtrans API credentials (sandbox/production)
- Platform fee percentage and fixed fees
- Withdrawal fees and minimum withdrawal amount
- Payment methods enabled for clients
- Password and security requirements
- Withdrawal processing rules

## Routes

### Client Routes
- `/client/orders/{id}/payment`: Payment page
- `/client/orders/{id}/payment/process`: Process payment
- `/client/files/{id}/download`: Download files (with security check)

### Freelancer Routes
- `/freelancer/orders`: View and manage orders
- `/freelancer/payments`: View earnings and transactions
- `/freelancer/withdrawal`: Request and manage withdrawals
- `/freelancer/payment-methods`: Manage withdrawal methods

### Admin Routes
- `/admin/withdrawals`: Review withdrawal requests
- `/admin/payments`: Monitor all payments
- `/admin/settings`: Configure system-wide settings

## Transaction Lifecycle

1. **Order Creation**: Initial order record with pending status
2. **Payment Processing**: Payment record created and processed
3. **Payment Completion**: 
   - Order status updated
   - Files unlocked for client
   - Funds added to freelancer pending balance
4. **Order Completion**: Funds moved to freelancer available balance
5. **Withdrawal Request**: Freelancer requests funds withdrawal
6. **Admin Approval**: Admin reviews and approves withdrawal
7. **Transfer Processing**: Funds transferred to freelancer account
8. **Transaction Completion**: Records updated and notifications sent

## Future Enhancements

1. **Payment Analytics**: Advanced reporting and analytics
2. **Multiple Currency Support**: Support for international payments
3. **Subscription Model**: Support for recurring payments
4. **Escrow System**: Enhanced fund security for large projects
5. **Automated Withdrawal**: Scheduled automatic withdrawals
