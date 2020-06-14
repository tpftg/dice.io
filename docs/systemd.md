# Run as Linux service with systemd

Create `/etc/systemd/system/diceio.service` file :

```
[Unit]
Description=dice.io server
After=network.target
StartLimitIntervalSec=0

[Service]
Type=simple
Restart=always
RestartSec=1
User=www-data
ExecStart=/usr/bin/diceio

[Install]
WantedBy=multi-user.target
```

Note: adjust `User` and `ExecStart` parameters to your needs.

Then start service :

```shell
$ systemctl start diceio
```

To automatically start service on boot :

```shell
$ systemctl enable diceio
```
