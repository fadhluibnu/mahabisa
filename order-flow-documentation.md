# Order Flow Implementation - Mahabisa Marketplace

This document explains the complete order flow implemented in the Mahabisa Freelance Marketplace platform.

## Order Flow Stages

The order flow follows these stages:

1. **Service Selection & Order Creation**
   - Client browses services
   - Client places an order through `ClientController@orderService`
   - Order is created with "pending_payment" status

2. **Payment Process**
   - Client makes payment via Midtrans integration
   - Payment webhook receives notification via `PaymentController@handleMidtransNotification`
   - OrderService processes successful payments via `processSuccessfulPayment`

3. **Freelancer Acceptance & Delivery**
   - Freelancer receives notification of new order
   - Freelancer accepts the order (status changes to "in_progress")
   - Freelancer works on the order and communicates with client
   - Freelancer delivers work by uploading files via `OrderController@completeOrder`

4. **File Protection Until Payment**
   - Deliverable files are locked via `FileService@canDownload` mechanism
   - Files have "deliverable" status until payment is confirmed

5. **Payment & File Access**
   - Client receives notification that order is delivered
   - Client makes payment through Midtrans integration
   - Payment is processed in sandbox mode initially
   - Admin can manually confirm payments via `OrderController@adminConfirmPayment`
   - Upon payment, files are activated via `OrderService@activateDeliverableFiles`
   - Client can then download files

6. **Fund Distribution**
   - System tracks all transactions in database
   - Platform fee is recorded separately
   - Freelancer's share is reserved in pending balance
   - Funds are released to freelancer's available balance upon order completion

## Key Components

### Controllers
- `ClientController`: Handles order creation and client-side operations
- `OrderController`: Manages order status changes and payments
- `PaymentController`: Processes Midtrans payments and notifications
- `FileController`: Handles file uploads and secure downloads

### Services
- `OrderService`: Core service handling order creation, payments, and completion
- `MidtransService`: Handles payment gateway integration
- `FileService`: Manages file uploads and access control
- `NotificationService`: Sends notifications to users

### Notification Classes
- `PaymentCompleted`: Notifies client when payment is processed
- `PaymentReceived`: Notifies freelancer when payment is received
- `OrderDelivered`: Notifies client when order is delivered
- `FilesAvailable`: Notifies client when files are available for download

### Models
- `Order`: Tracks order status and details
- `Payment`: Records payment information
- `File`: Handles file storage and access control
- `Transaction`: Tracks all financial transactions

## Usage Flow

1. Client orders a service
2. Freelancer accepts and works on the order
3. Freelancer delivers work by uploading files
4. Client is notified and directed to payment
5. Client pays using Midtrans
6. Files are unlocked for download
7. Freelancer receives funds in their wallet

## Midtrans Integration

The system integrates with Midtrans payment gateway:
- Sandbox mode for testing
- Supports multiple payment methods (bank transfer, credit card, e-wallet)
- Webhook notifications ensure real-time payment processing

## Security Features

- Files are protected until payment is confirmed
- Payment transactions are recorded for auditing
- Admin approval option provides additional verification layer

## Database Schema Enhancements

The order flow implementation required enhancements to the database schema:

1. **Orders Table**
   - Added `payment_completed_at` column to track when payment is completed
   - Added `delivered_at` column to track when order is delivered
   - Created a compound index on `status` and `payment_completed_at` for efficient queries

2. **Files Table**
   - Added `activated_at` column to track when files become available for download
   - Added index on `status` field for efficient queries

## Technical Implementation Notes

### File Security System
Files are protected using a multi-layered security approach:
1. Files are initially uploaded as "deliverable" status
2. Files remain locked until payment is confirmed
3. Once payment is confirmed, files are activated with `activated_at` timestamp
4. Only after activation can files be downloaded by the client

### Payment Processing Flow
1. Client initiates payment through MidtransPayment component
2. Payment notification is received via webhook
3. `OrderService@processSuccessfulPayment` handles the transaction
4. `payment_completed_at` is updated on the order
5. Files are activated through `OrderService@activateDeliverableFiles`
6. Notifications are sent to all relevant parties

### React Components
- `MidtransPayment.jsx`: Reusable component that handles Midtrans integration
- `Payment.jsx`: Page component that displays payment options and status

### Database Migration Fix
To resolve the migration issues, a direct fix script (`fix_payments_final.php`) was implemented that:
1. Verifies and creates necessary columns with proper placement
2. Ensures proper indexes exist
3. Validates model compatibility with the new schema
4. Applies changes using both Schema builder and direct SQL statements

This ensures a robust database structure that supports the entire order flow without interruptions.
