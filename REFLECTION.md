# Week 1 reflection

1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?
   Ans:With plain DOM code, I give the browser step-by-step instructions to change the page. In React, I describe what the page should look like, and React updates it when the data changes.

2. Why must a component name start with a capital letter?
   Ans:React uses capital letters to recognize components. If a name starts with a lowercase letter, React treats it as a regular HTML tag.

3. What does a fragment <>...</> do, and why not just use a <div>?
   Ans:A fragment groups several elements so a component can return them together, without adding an extra element to the page. A <div> would add another element to the HTML, even if we only needed it for grouping.
4. Name one benefit of splitting the UI into small components.
   Ans:Small components make the code easier to understand and update. They can also be reused in different parts of the app.

# Week 6 reflection

### 1. What happens when I place an order

When I click **Place order**, `CheckoutForm` validates the form and calls `CartPage`’s `handlePlaceOrder` function. That function calls `placeOrders` in `orders.js`, which saves the order to Firestore, creating one order for each vendor in the cart. After the save succeeds, `clearCart` empties the cart and the app navigates to `/orders`. `useMyOrders` listens for changes with Firestore’s `onSnapshot`, so `OrdersPage` displays the new order when Firestore sends the update. I don’t call `setOrders` because the snapshot listener supplies the orders.

### 2. Why orders are stored in a top-level collection

I use a top-level `orders` collection so the app can query a student’s orders by `studentUid`, across all vendors. Each order stores the vendor name and item names and prices as they were when the order was placed. This lets the order page show a useful history even if a vendor later changes or removes a menu item. It also means the app doesn’t need to fetch each vendor’s menu again just to display an old order.

### 3. Where my order notes are stored

My personal feature is **order notes per item**. Each note is saved inside the matching item in the order document’s `items` array at `orders/{orderId}`. In `OrdersPage.jsx`, this line reads the saved note:

const note = item.note ?? item.item?.note ?? ''

Then the page displays it under the item as “Special instructions.

### Bug I fixed today

When I tried to change an order’s pickup time, the app showed an error. The cause was that updateDoc was missing from the Firestore imports in orders.js, so the function couldn’t run. I added the import and tried again, but Firestore then rejected the update because the rules didn’t allow students to edit their orders. I updated the rules to allow the owner to change only the pickup time while the order status is Received.

### Instead of deleting, keep a record: make Cancel set status: 'Cancelled' with updateDoc and hide cancelled orders. Which is better for the shop, delete or soft-cancel?

Soft-cancelling is better for the shop because it keeps a record of the order and its cancellation. Deleting removes that history, which could make it harder to review or resolve order issues.
