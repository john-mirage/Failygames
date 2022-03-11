# Leaderboard component

## Folder structure

```markdown
- src
    - data
        - data.json  
    - components
        - leaderboard
            - images
                - bronze-medal.svg
                - gold-medal.svg
                - silver-medal.svg
            - _leaderboard.scss
            - leaderboard.js
    - pages
        - index
            - main.scss
            - main.js
```

## HTML

Make sure to replace:
- Table head id
- Table body id

##### index.html

```html
<div class="leaderboard">
    <div class="leaderboard__container">
        <div class="leaderboard__content">
            <table class="leaderboard__table">
                <thead class="leaderboard__head" id="{{ table-head-id }}"></thead>
                <tbody class="leaderboard__body" id="{{ table-body-id }}"></tbody>
            </table>
        </div>
    </div>
</div>
```

## SCSS

Make sure that the relative path is correct.

##### main.scss

```scss
@use 'components/leaderboard/leaderboard';
```

## JS

Make sure to replace:
- json file path
- leaderboard options

Table data properties length must equal columns length (team, points === team, points).

##### data.json

```json
[
    {
        "team": "team 1",
        "points": 0
    },
    {
        "team": "team 2",
        "points": 0
    },
    {
        "team": "team 3",
        "points": 0
    }
]
```

##### main.js

```js
import Leaderboard from "@components/leaderboard/leaderboard";
import leaderboardData from "@data/data.json";

const leaderboardOptions = {
    data: leaderboardData,
    table: {
        columns: ["team", "points"],
        head: "table-head-id",
        body: "table-body-id",
    },
};
const leaderboard = new Leaderboard(leaderboardOptions);
```