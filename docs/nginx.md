# Nginx proxy configuration

These examples assume that the dice.io server is listening at address `127.0.0.1` on port `8080`.

## Serve in root path of a domain

Client configuration :

```javascript
var dr = new DiceIO({
  channel: 'bebop123',
  nickname: 'Frodo',
  serverUrl: 'http://example.com',
  // [...]
});
```

Nginx server directive :

```
server {
    listen 80;
    listen [::]:80;
    server_name example.com;

    location / {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_http_version 1.1;
        proxy_pass http://127.0.0.1:8080/;
    }
}
```

In this example, server application should be available at `http://example.com` url.

## Serve in specific path of a domain

Client configuration :

```javascript
var dr = new DiceIO({
  channel: 'bebop123',
  nickname: 'Frodo',
  serverUrl: 'http://example.com',
  socketOptions: { path: '/dice/socket.io' },
  // [...]
});
```

Nginx server directive :

```
server {
    listen 80;
    listen [::]:80;
    server_name example.com;

    location /dice/ {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_http_version 1.1;
        proxy_pass http://127.0.0.1:8080/;
    }
}
```

In this example, server application should be available at `http://example.com/dice/` url.

## Automatic client configuration

In this example, the values ​​of `serverURL` and `socketOptions` correspond to the default configuration of the client.

```javascript
var dr = new DiceIO({
  channel: 'bebop123',
  nickname: 'Gandalf',
  serverUrl: window.location.origin,
  socketOptions: { path: window.location.pathname + 'socket.io' },
  // [...]
});
```

This client configuration should work with any of the previous Nginx proxy configurations.
