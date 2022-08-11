# my-cat-likes-firebase 🔥 😺

A firebase wrapper to make working with firebase painless

```
npm install my-cat-likes-firebase
```

## Quickstart & Initialization 💨

### Client side:

```javascript
const { MyCatLikesFirebase } = require("my-cat-likes-firebase");

let firebase = new MyCatLikesFirebase({
  firebaseConfig: config,
  loggingEnabled: true,
});
```

### Server side

```javascript
const { MyCatLikesFirebaseServer } = require("my-cat-likes-firebase");

let firebase = new MyCatLikesFirebase({
  firebaseCredentialsPath: "path/to/credentials",
  loggingEnabled: true,
});
```

A quick note about MyCatLikesFirebaseServer, all functions are the same as client side but do not support path segments.

## Documentation 📜

### Find Or Create Doc
#### Currently only works on Server
```js
const { MyCatLikesFirebaseServer } = require("my-cat-likes-firebase");

const firebase = new MyCatLikesFirebaseServer({
  firebaseConfig: config,
  loggingEnabled: true,
});

firebase.findOrCreateDoc({ someCoolData: ":)" }, `path/to/doc`)
```

| Parameter      | Type        | Description                                                   |
| :------------- | :---------- | :------------------------------------------------------------ |
| `data`         | `object`    | The data to write to the doc with if not found                |
| `path`         | `string`    | The path to the doc to write to or find                       |

Returns a promise that resolves to a boolean returning the data that was either written or found in the doc

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

### Create or Update Doc

```js
const { MyCatLikesFirebase } = require("my-cat-likes-firebase");

let firebase = new MyCatLikesFirebase({
  firebaseConfig: config,
  loggingEnabled: true,
});

firebase.createOrUpdateDoc({ someCoolData: ":)" }, "path/to/doc");
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `data`    | `object` | The data to write to the doc with |
| `path`    | `string` | The path to the doc to write to   |

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

### Get Docs

```js
const { MyCatLikesFirebase } = require("my-cat-likes-firebase");

let firebase = new MyCatLikesFirebase({
  firebaseConfig: config,
  loggingEnabled: true,
});

firebase.getDocs("path/to/collection");
```

| Parameter | Type     | Description                                   |
| :-------- | :------- | :-------------------------------------------- |
| `path`    | `string` | The path to the collection to fetch docs from |

Returns a promise that resolves to an object containing the docs or an error

### Delete Doc

```js
const { MyCatLikesFirebase } = require("my-cat-likes-firebase");

let firebase = new MyCatLikesFirebase({
  firebaseConfig: config,
  loggingEnabled: true,
});

firebase.deleteDoc("path/to/doc");
```

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `path`    | `string` | The path to the doc to delete |

Returns a promise that resolves to a boolean or an error string
