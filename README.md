# Animation Flow

- Your animation is stored as an array of shapes

- Each shape has a birth and death frame (frames when the shape first appears on screen and first disappears from screen respectively)

- On each frame, we iterate through all shapes in the array. If the current frame falls between that shape's birth and death, we render it

- To render a shape at a specific frame, we iterate through all animations that should currently be visible and squash them into one state

- each state consists of different properties of a shape (e.g. color, height, width, location, etc.)


