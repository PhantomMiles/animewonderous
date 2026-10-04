import { notFound } from 'next/navigation';
import { prisma } from '../../../lib/prisma';
import OrderDetailsPage from '../../../pages/OrderDetailsPage';

export default async function OrderDetails({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;

  // We check by reference first in case the URL uses the Paystack reference,
  // falling back to checking by internal order ID.
  const order = await prisma.order.findFirst({
    where: {
      OR: [
        { id: orderId },
        { reference: orderId }
      ]
    },
    include: {
      items: {
        include: {
          product: true,
        }
      }
    }
  });

  if (!order) {
    notFound();
  }

  return (
    <OrderDetailsPage order={order} />
  );
}
