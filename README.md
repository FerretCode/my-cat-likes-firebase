# my-cat-likes-firebase 🔥 😺

A firebase wrapper to make working with firebase painless

```
npm install my-cat-likes-firebase
```

## Quickstart & Initialization 💨

```javascript
const { MyCatLikesFirebase } = require("my-cat-likes-firebase");

let firebase = new MyCatLikesFirebase({
  firebaseConfig: config,
  loggingEnabled: true,
});
```

## Documentation 📜

### Create Doc

```js
const { MyCatLikesFirebase } = require("my-cat-likes-firebase");

let firebase = new MyCatLikesFirebase({
  firebaseConfig: config,
  loggingEnabled: true,
});

firebase.createDoc({ someCoolData: ":)" }, "path/to/doc");
```

| Parameter      | Type        | Description                                                   |
| :------------- | :---------- | :------------------------------------------------------------ |
| `data`         | `object`    | The data to write to the doc with                             |
| `path`         | `string`    | The path to the doc to write to                               |
| `pathSegments` | `...string` | Any additional path segments that will be added onto the path |

Returns a promise that resolves to a boolean representing whether the write failed or not

### Update Doc

```js
const { MyCatLikesFirebase } = require("my-cat-likes-firebase");

let firebase = new MyCatLikesFirebase({
  firebaseConfig: config,
  loggingEnabled: true,
});

firebase.updateDoc({ someCoolData: ":)" }, "path/to/doc");
```

| Parameter      | Type        | Description                                                   |
| :------------- | :---------- | :------------------------------------------------------------ |
| `data`         | `object`    | The data to write to the doc with                             |
| `path`         | `string`    | The path to the doc to write to                               |
| `pathSegments` | `...string` | Any additional path segments that will be added onto the path |

Returns a promise that resolves to a boolean representing whether the write failed or not

### Get Doc

```js
const { MyCatLikesFirebase } = require("my-cat-likes-firebase");

let firebase = new MyCatLikesFirebase({
  firebaseConfig: config,
  loggingEnabled: true,
});

firebase.getDoc("path/to/doc");
```

| Parameter      | Type        | Description                                                   |
| :------------- | :---------- | :------------------------------------------------------------ |
| `path`         | `string`    | The path to the doc to get                                    |
| `pathSegments` | `...string` | Any additional path segments that will be added onto the path |

Returns a promise that resolves to the doc data or an error string

### Delete Doc

```js
const { MyCatLikesFirebase } = require("my-cat-likes-firebase");

let firebase = new MyCatLikesFirebase({
  firebaseConfig: config,
  loggingEnabled: true,
});

firebase.deleteDoc("path/to/doc");
```

| Parameter      | Type        | Description                                                   |
| :------------- | :---------- | :------------------------------------------------------------ |
| `path`         | `string`    | The path to the doc to delete                                    |

Returns a promise that resolves to a boolean or an error string