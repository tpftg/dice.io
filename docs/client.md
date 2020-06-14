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
| connect | boolean | Set this option to `true` to automatically connect to server. (default is `false`) |
| engine | string | Set engine used by server to roll dice formula. (default is none) |
| historyOnConnect | boolean | Set this option to `false` to not get dice roll history after (re)connect to server. (default is `true`) |
| nickname | string | Set user nickname. (default is random. Example: `User123`) |
| onConnect | Function | Client connect callback. (default is none) |
| onDisconnect | Function | Client disconnect callback. (default is none) |
| onError | Function | Roll error callback. (default is none) |
| onHistory | Function | Roll history callback. (default is none) |
| onRoll | Function | Roll result callback. (default is none) |
| serverUrl | string | Set server connect URL. (default is `window.location.origin`) |
| socketOptions | object | Set [socket.io client](https://github.com/socketio/engine.io-client#methods) options. default is `{ path: window.location.pathname + 'socket.io' }` |

## Dice engines

Note: the default dice roller engine is set in server configuration.

The engine used by server can be set in client with `engine` option or `setEngine` method with the following values :

* `DiceIO.engines.DICE_JS` : use [dice.js](https://github.com/lordnull/dice.js) library
* `DiceIO.engines.RPG_DICE_JS` : use [rpg-dice-roller](https://github.com/GreenImp/rpg-dice-roller) library _(server default)_
* `DiceIO.engines.RPG_DICE_ROLLER` : use [rpgdice](https://github.com/Morgul/rpgdice) library

## Client API

### connect()

Connect to server.

```javascript
diceRoller.connect();
```

Note: this method return nothing and call `onConnect` callback on success.

### disconnect()

Disconnect from server.

```javascript
diceRoller.disconnect();
```

Note: this method return nothing and call `onDisconnect` callback on success.

### getHistory([length])

Get dice rolls history.

```javascript
diceRoller.getHistory();  // Get the last dice rolls stored by server

diceRoller.getHistory(10); // Get the last ten dice rolls
```

Note: this method return nothing and call `onHistory` callback on success.

### roll(formula)

Roll dice formula.

```javascript
diceRoller.roll('1d6');
```

Note: this method return nothing and call `onRoll` callback on success or `onError` callback on failure.

### setEngine(engine)

Set dice roller engine.

```javascript
diceRoller.setEngine(DiceIO.engines.DICE_JS);
```

### setNickname(nickname)

Set user nickname.

```javascript
diceRoller.setNickname('Frodo');
```

### onConnect(callback)

Set client connect callback.

```javascript
diceRoller.onConnect(function(config) {
  // Client is connected

  // config is client configuration object
  console.log(config);
});
```

### onDisconnect(callback)

Set client disconnect callback.

```javascript
diceRoller.onDisconnect(function(config) {
  // Client is disconnected

  // config is client configuration object
  console.log(config);
});
```

### onError(callback)

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

Set history callback.

```javascript
diceRoller.onHistory(function(history) {
  // history is an Array of roll result objects
  console.log(history);
});
```

### onRoll(callback)

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

Get user nickname.

```javascript
console.log(diceRoller.nickname);
```

### config

Get client configuration object.

```javascript
console.log(diceRoller.config);
```

### connected

Get boolean value which indicate if client is connected to server.

```javascript
if (diceRoller.connected) {
  // dice roller client is connected
}
```
