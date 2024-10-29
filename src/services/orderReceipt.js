export const orderReceipts = (orderDetails) => {
    return `<div style="font-family: Arial, sans-serif; color: #333;">
    <h2 style="color: #4CAF50;">Order Receipt</h2>
    <p>Order ID: <strong>${orderDetails._id}</strong></p>
    <p>Payment Intent ID: <strong>${orderDetails.paymentIntentId}</strong></p>
    
    <h3>Customer Information</h3>
    <p>Name: ${orderDetails.customer.firstName} ${orderDetails.customer.lastName}</p>
    <p>Email: ${orderDetails.customer.email}</p>
    <p>Phone: ${orderDetails.customer.phone}</p>
    <p>Address: ${orderDetails.customer.address}, ${orderDetails.customer.city}, ${orderDetails.customer.state} - ${orderDetails.customer.postalCode}, ${orderDetails.customer.country}</p>

    <h3>Items</h3>
    <table style="width: 100%; border-collapse: collapse;">
      <tr style="background-color: #f5f5f5;">
        <th style="padding: 8px; border: 1px solid #ddd;">Title</th>
        <th style="padding: 8px; border: 1px solid #ddd;">Quantity</th>
        <th style="padding: 8px; border: 1px solid #ddd;">Price</th>
        <th style="padding: 8px; border: 1px solid #ddd;">Total</th>
      </tr>
      ${orderDetails.items
        .map(
          (item) => `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">${item.title}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${item.quantity}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">$${item.price.toFixed(
          2
        )}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">$${(
          item.quantity * item.price
        ).toFixed(2)}</td>
      </tr>
      <tr>
        <td colspan="4" style="padding: 8px; border: 1px solid #ddd;">
          <strong>Paper Details for ${item.title}:</strong><br>
          ${Object.entries(item.itemDetails)
            .map(
              ([key, value]) =>
                `<span style="font-size: 12px; color: #666;">${key}: ${
                  value.title
                }</span><br>`
            )
            .join("")}
        </td>
      </tr>
      `
        )
        .join("")}
    </table>

    <h3 style="margin-top: 16px;">Order Summary</h3>
    <p><strong>Subtotal:</strong> $${orderDetails.totalAmount.toFixed(2)}</p>
    <p><strong>Total Amount:</strong> $${orderDetails.totalAmount.toFixed(2)}</p>
  </div>
`;
}