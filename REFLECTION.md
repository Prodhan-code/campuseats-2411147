# Week 1 reflection
1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?
Ans:With plain DOM code, I give the browser step-by-step instructions to change the page. In React, I describe what the page should look like, and React updates it when the data changes.

2. Why must a component name start with a capital letter?
Ans:React uses capital letters to recognize components. If a name starts with a lowercase letter, React treats it as a regular HTML tag.

3. What does a fragment <>...</> do, and why not just use a <div>?
Ans:A fragment groups several elements so a component can return them together, without adding an extra element to the page. A <div> would add another element to the HTML, even if we only needed it for grouping.
4. Name one benefit of splitting the UI into small components.
Ans:Small components make the code easier to understand and update. They can also be reused in different parts of the app.