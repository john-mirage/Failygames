## Home page

### Icon button

1. [ ] rework hamburger icon: (2 options)
    - Replace custom menu icon with real svg icon.
    - Use existing line to animate the "icon" when drawer is open.

### Containers (high)

1. [ ] Merge containers (top-app-bar container + container) and add modifiers

### Leaderboard (high)

1. [x] Add local vanillaJS "api" to get json file (no jquery -> more perfs).
2. [x] format object
3. [x] Style table

### Search feature (high)

1. [x] add search logic (vanillaJs or fuseJs)
2. [x] add logic to target the good table/tab when submiting search
3. [x] Fix the table height to prevent user viewport to scroll top
    - Current modification only get the first tab height because the other tabs are display none.
    - Change the visibility type
        - [x] set container with display flex and add carrousel logic and fix height
        - OR set all tabs and play with z-index opacity and visibility and fix height
    - below modifications allow us to animate table.
4. [ ] Add filters ???
5. [x] Auto sort team by points and add position property.
6. [ ] Add button to clear user input.
7. [x] add debouncer for the user input (from lodash)
    - Consider using custom debounce function if it is easy enough to be copied from lodash
8. [x] Add medals for the first positions (1, 2, 3)

### Timer (low)

1. [ ] Create layer for the pannels (top pannel, bottom pannel, flipping pannel)
2. [ ] add logic

### Tab list (high)

1. [x] make tab controller full width
2. [x] remove top padding for better consistency.

### Drawer (low)

1. [ ] Clean components.

### On load (high)

1. [x] Prevent initial animations to launch when opening page.
