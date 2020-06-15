# Client library

Application server provide a Javascript dice roller client library. Default root path is `/js/diceio.min.js`.

## Getting started

Add library scripts to your HTML :

```html
<head>
  <script type="text/javascript" src="https://example.com/js/diceio.min.js"></script>
</head>
```

Then create client instance :

```javascript
var diceRoller = new DiceIO({ /* optional configuration object */ });

diceRoller
  .setNickname('Frodo')
  .onHistory(function(history) {
    // history is an Array of roll results
    console.log(history);
  })
  .onRoll(fonction(result) {
    // result is a dice roll result object
    console.log(result);
  })
  .connect();
```

Roll dice with formula :

```javascript
diceRoller.roll('1d6');
```

## Configuration options

| Name | Type | Description |
| ---- | :--: | ----------- |
| connect | Boolean | Set this option to `true` to automatically connect to server. (default is `false`) |
| engine | String | Set engine used by server to roll dice formula. (default is none) |
| historyOnConnect | Boolean | Set this option to `false` to not get dice roll history after (re)connect to server. (default is `true`) |
| nickname | String | Set user nickname. (default is random. Example: `User123`) |
| onConnect | Function | Client connect callback. (default is none) |
| onDisconnect | Function | Client disconnect callback. (default is none) |
| onError | Function | Roll error callback. (default is none) |
| onHistory | Function | Roll history callback. (default is none) |
| onRoll | Function | Roll result callback. (default is none) |
| serverUrl | String | Set server connect URL. (default is `window.location.origin`) |
| socketOptions | Object | Set [socket.io client](https://github.com/socketio/engine.io-client#methods) options. default is `{ path: window.location.pathname + 'socket.io' }` |

## Dice roller engines

Note: the default dice roller engine is set in server configuration.

The engine used by server can be set in client with `engine` option or `setEngine` method with the following values :

* `DiceIO.engines.DICE_JS` : use [dice.js](https://github.com/lordnull/dice.js) library
* `DiceIO.engines.RPG_DICE_JS` : use [rpg-dice-roller](https://github.com/GreenImp/rpg-dice-roller) library _(server default)_
* `DiceIO.engines.RPG_DICE_ROLLER` : use [rpgdice](https://github.com/Morgul/rpgdice) library

## Client API

### connect()

Connect to server.

__Note:__ this method call `onConnect` callback on success.

```javascript
diceRoller.connect();
```

### disconnect()

Disconnect from server.

__Note:__ this method call `onDisconnect` callback on success.

```javascript
diceRoller.disconnect();
```

### getHistory([length])

* `length` _(Number)_

Get dice rolls history.

__Note:__ this method call `onHistory` callback on success.

```javascript
diceRoller.getHistory();  // Get the last dice rolls stored by server

diceRoller.getHistory(10); // Get the last ten dice rolls
```

### roll(formula)

* `formula` _(String)_

Roll dice formula.

__Note:__ this method call `onRoll` callback on success or `onError` callback on failure.

```javascript
diceRoller.roll('1d6');
```

### setEngine(engine)

* `engine` _(String)_
* __Returns__ `DiceIO` for chaining

Set dice roller engine.

```javascript
diceRoller.setEngine(DiceIO.engines.DICE_JS);
```

### setNickname(nickname)

* `nickname` _(String)_
* __Returns__ `DiceIO` for chaining

Set user nickname.

```javascript
diceRoller.setNickname('Frodo');
```

### onConnect(callback)

* `callback` _(Function)_
* __Returns__ `DiceIO` for chaining

Set client connect callback.

```javascript
diceRoller.onConnect(function(config) {
  // Client is connected

  // config is client configuration object
  console.log(config);
});
```

### onDisconnect(callback)

* `callback` _(Function)_
* __Returns__ `DiceIO` for chaining

Set client disconnect callback.

```javascript
diceRoller.onDisconnect(function(config) {
  // Client is disconnected

  // config is client configuration object
  console.log(config);
});
```

### onError(callback)

* `callback` _(Function)_
* __Returns__ `DiceIO` for chaining

Set roll error callback.

```javascript
diceRoller.onError(function(error) {
  // Roll formula has failed

  /**
   * error is roll error object
   *
   * {
   *   error: 'raw engine error object',
   *   message: 'error message',
   *   roll: { engine: { name: 'engine name' }, formula: 'dice roll formula' }
   * }
   */
  console.log(error);
});
```

### onHistory(callback)

* `callback` _(Function)_
* __Returns__ `DiceIO` for chaining

Set history callback.

```javascript
diceRoller.onHistory(function(history) {
  // history is an Array of roll result objects
  console.log(history);
});
```

### onRoll(callback)

* `callback` _(Function)_
* __Returns__ `DiceIO` for chaining

Set roll result callback.

```javascript
diceRoller.onRoll(function(result) {
  /**
   * result is roll result object
   *
   * {
   *   id: 'uuid string',
   *   nickname: 'user nickname',
   *   roll: {
   *     engine: { name: 'engine name', result: 'raw engine result object' },
   *     formula: 'dice roll formula',
   *     message: 'roll result string',
   *     value: 'roll result total value',
   *   },
   *   timestamp: 'timestamp value in milliseconds',
   * }
   */
  console.log(result);
});
```

## Client properties

### nickname

* _(String)_

The user nickname. _(read only)_

### config

* _(Object)_

The client configuration. _(read only)_

### connected

* _(Boolean)_

Indicate if client is connected to server. _(read only)_
