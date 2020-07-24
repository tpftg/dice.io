# Miro Web Plugin

This documentation assumes that :

* you host your own dice.io server on an https domain.
* you are logged in to [Miro](https://miro.com)

## Getting started

To get started you need to :

* Create __Dev team__ for Sandbox _(Allow to create application)_
* Create an application and set it up _(web-plugin url and scopes)_

### Create Dev Team

Note : you can skip this step if already have __Dev Team__.

Just follow [instructions here](https://developers.miro.com/docs/getting-started#section-step-1-get-developer-team). _(click on the __"Get Dev Team"__ button)_

### Create application

In Miro account __profile settings__, click on __"API, SDK & Embed"__ tab and click on __"Create a new app"__ button.

![profile settings](miro-profile.png)

In __Web-plugin__ section enter the dice.io server web plugin url : it is server root url __with `/miro/` path__ _(for example `https://example.com/miro/`)_, and click on __"save"__ button.

In __OAuth scopes__ section select `boards:read` scope.

Finally, click on __"Install app and get OAuth Token"__ button and choose the team where to install the plugin.

![app settings](miro-app.png)

Note: this web plugin does not access to boards, it only get :

* the name of current logged in user to setup the dice roller nickname
* the team account id to setup the dice roller channel name _(shared by all users connected to the board)_

## Usage

When installed, the web plugin add a dice icon on the bottom bar.

Just click on dice button to open sidebar and type a dice formula.

![profile settings](miro-plugin.png)

## Credits

Dice SVG icon originally made by [Smashicons](https://smashicons.com/) from [www.flaticon.com](https://www.flaticon.com/).
