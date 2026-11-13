import { Link } from "react-router";
import { Loading, ErrorMessage } from "../components/Status.jsx";
import OrderStatus from "../components/OrderStatus.jsx";
import OrderActions from "../components/OrderActions.jsx";
import { useMyOrders } from "../hooks/useMyOrders.js";

function formatPlacedDate(createdAt) {
  if (!createdAt) return "Just now";

  const date = createdAt.toDate ? createdAt.toDate() : new Date(createdAt);

  if (Number.isNaN(date.getTime())) return "Just now";

  return date.toLocaleString("en-MY", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function OrdersPage() {
  const { orders, loading, error } = useMyOrders();

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <main className="container">
      <h2 className="section-title">My orders</h2>

      {orders.length === 0 ? (
        <section className="card">
          <p className="muted">You haven’t placed any orders yet.</p>
          <Link to="/">Browse vendors</Link>
        </section>
      ) : (
        <ul className="order-list">
          {orders.map((order, orderIndex) => {
            const items = order.items ?? order.lines ?? [];

            return (
              <li className="card order-card" key={order.id}>
                <div className="order-heading">
                  <div>
                    <p className="muted order-label">
                      ORDER {orders.length - orderIndex}
                    </p>
                    <h3>{order.vendorName ?? "CampusEats order"}</h3>
                  </div>

                  <div>
                    <OrderStatus status={order.status ?? "Received"} />
                    {order.status === "Received" && (
                      <OrderActions order={order} />
                    )}
                  </div>
                </div>

                <div className="order-details">
                  <p>
                    <span>Mahallah</span>
                    <strong>{order.mahallah ?? "—"}</strong>
                  </p>
                  <p>
                    <span>Pickup time</span>
                    <strong>{order.pickupTime ?? "—"}</strong>
                  </p>
                  <p>
                    <span>Placed</span>
                    <strong>
                      {formatPlacedDate(order.createdAt ?? order.placedAt)}
                    </strong>
                  </p>
                </div>

                <div>
                  <h4 className="order-items-title">Items</h4>
                  <ul className="order-items">
                    {items.map((item, itemIndex) => {
                      const name = item.name ?? item.item?.name ?? "Item";
                      const note = item.note ?? item.item?.note ?? "";

                      return (
                        <li
                          className="order-item"
                          key={
                            item.itemId ??
                            item.item?.id ??
                            `${order.id}-${itemIndex}`
                          }
                        >
                          <p>
                            {item.qty} × {name}
                          </p>

                          {note.trim() && (
                            <p className="muted order-note">
                              Special instructions: {note}
                            </p>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <p className="price order-total">
                  Total: RM {Number(order.total ?? 0).toFixed(2)}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}

export default OrdersPage;
