[![MIT license](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

# Dice.io

A simple [Node.js](https://nodejs.org) dice roller server.

## Getting started

Install server from NPM :

```shell
$ npm install -g dice.io
```

Run the server (use -h for help) :

```shell
$ diceio -a 127.0.0.1 -p 8080
```

Then open `http://127.0.0.1:8080` in your browser to display demo application.

## Dice roller client library

Application server provide a Javascript [client](docs/client.md) library to create your own web application.

## Miro integration

Application server provide a [Web Plugin](docs/miro.md) for the [Miro](https://miro.com) online collaborative whiteboarding platform.

## Miscellaneous

* Nginx [proxy configuration](docs/nginx.md) examples
* Linux [systemd service file](docs/systemd.md) example

## About

Project main goals are to provide :

* a simple collaborative way to roll dice formula
* a client library to allow custom integration

If you wish another Javascript dice engine to be added to the project, create a new [issue](https://github.com/tpftg/dice.io/issues).

A live demo is available [here](https://diceio-app.herokuapp.com), hosted on a small [Heroku](https://www.heroku.com/home) free instance. Please __don't use it as main server__, instead deploy your own server following [this guide](https://github.com/tpftg/diceio-heroku).

## Credits

This project mainly uses the following dependencies :

* [dice.js](https://github.com/lordnull/dice.js)
* [express](https://github.com/expressjs/express)
* [rpg-dice-roller](https://github.com/GreenImp/rpg-dice-roller) _(server default engine)_
* [rpgdice](https://github.com/Morgul/rpgdice)
* [socket.io](https://github.com/socketio/socket.io)

Dice SVG icon originally made by [Freepik](https://www.flaticon.com/authors/freepik) from [www.flaticon.com](https://www.flaticon.com/).

_"Shake And Roll Dice"_ sound made by __Mike Koenig__ from [sounbible.com](http://soundbible.com/182-Shake-And-Roll-Dice.html). [Creative Commons](https://creativecommons.org/licenses/by/3.0/legalcode).

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
