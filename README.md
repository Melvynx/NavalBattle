# Naval Battle 🚤

> Little application which mixes **front** and **api**

I did this in the context of school project to learn C#.

So I choosed to make a react front app with a c# backend.

## Backend

My api follow [guidlines of microsoft](https://docs.microsoft.com/fr-ch/aspnet/core/tutorials/first-web-api?view=aspnetcore-5.0&tabs=visual-studio).

It doesn't use a real bdd, but a "fake" context to store values while it's active.

For now, to start this you need to have **Visual Studio** and run the project inside🏃‍♂️.

## Fronted

It's a simple `create-react-app` ⚛️ !

Just run `yarn start` and turn api on 🚀.

Warning: the api **url** is in the file `info.js`. Change it with your url.

## IA

My API simulates a player. It can play VS you!
It can :
- generate a correct boat placement
- play against a player

## End

My app is not made to be secure 🔓, but for local use. It is so easily possible to brain the api. For example, modify another game from another player because there is no token.

Have a nice day 😁
