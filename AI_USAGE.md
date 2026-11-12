# AI usage log

Using AI never costs marks; a vague or missing log does.
Add a new section every week, before you tag. Did not use AI? Write "None" under Tool(s).

## Week 1
- Tool(s):None
- What I asked for:
- What I kept, changed or rejected, and why:
- One thing the AI got wrong and how I fixed it:

## Week 2
- Tool(s):None
- What I asked for:
- What I kept, changed or rejected, and why:
- One thing the AI got wrong and how I fixed it:

## Week 3
- Tool(s):Gemini
- What I asked for:Help with loading vendors from JSON and building the cart and checkout.
- What I kept, changed or rejected, and why: I kept Gemini’s examples for loading the vendor menu and checking the checkout form. I changed the code to match the components in my app.
- One thing the AI got wrong and how I fixed it:It counted each cart line as one item, even when the quantity was higher. I fixed the cart count to add up the quantity of every item.

## Week 4
- Tool(s): Gemini
- What I asked for: Help setting up the Week 4 features in my CampusEats app, including custom hooks for vendors and cart data, sharing the cart with context, and connecting the pages through navigation.
- What I kept, changed or rejected, and why: I used the suggested page and navigation code as a guide. I changed parts to fit my project, such as the file imports and how the pages access the cart.
- One thing the AI got wrong and how I fixed it: The AI first gave me a CartPage that expected the cart data as props, but my app was using cart context. I updated the page to get the cart and its functions from useCart().

## Week 5
- Tool(s):Gemini
- What I asked for: Help adding Firebase authentication, protected pages, and a personal feature: per-item order notes that require an account.
- What I kept, changed or rejected, and why:I used the authentication and order-note examples, then adjusted them to fit my existing routes and cart. I made notes save for each signed-in user and showed guests a login link instead of the note field.
- One thing the AI got wrong and how I fixed it:The first route setup protected the cart, so guests couldn’t reach the cart to see the “Log in to add notes” message. I moved the cart route outside ProtectedRoute and kept checkout and order history restricted to signed-in users.