# js-notify-forwarder
A freedesktop notification forwarder written in javascript

## what is this?
The idea for this software was born when I started using a rapsberry pi with an iPad pro. I wanted a way to see the notifications of the raspberry on iOS.

## how it works?
The way it works is very simple it set ups itself as a Monitor of the freedesktop notification bus, when a message arrives it formats it and send it to iOS via an app called "pushover"

## what do you need
A raspberry, an ipad or ios, a paid pushover account (its just 5 bucks, its not crazy expensive)

## does it work
yes, but the code is very ugly, I couldnt find a way to set db-next-js to be a "forever monitor" so it has to "reattach" every time a noticiation arrives. 

take it like a proof of concept.

## whats next
- rewrite the whole thing on typescript
- Research a proper way to do a " forever monitor" 
- refactor as classes and reusability with other push services 
- write test (not in order of importance)
- integrate with PM2

## where is the config ?
Enviroment variables, you need to set ;

`PUSHOVER_API_KEY -> your app key`
`PUSHOVER_USER_KEY -> the key of your device`

run it with "node js-notify-forwarder.js"

