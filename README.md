# isomorphic-react-with-mobx
React + MobX + React-Router (CSR & SSR)

## How to use

```
git clone git@github.com:L-x-C/isomorphic-react-with-mobx.git
cd isomorphic-react-with-mobx
npm install
```

## Dev (client-side rendering)

```
npm start
open http://localhost:3000
```

## Production (server-side rendering)
```
npm run server
open http://localhost:20000
```

## Preview
![Login](https://github.com/L-x-C/isomorphic-react-with-mobx/blob/master/gifs/account.gif)
![List](https://github.com/L-x-C/isomorphic-react-with-mobx/blob/master/gifs/list.gif)
![404](https://github.com/L-x-C/isomorphic-react-with-mobx/blob/master/gifs/404.gif)


## F.A.Q
## How to fetch data on the server side?

Adding a `onEnter` function to a component, if you want to fetch another data after fetch the first, you should use `Promise`
See the example in `TestPage.js`

```
@action
static onEnter({states, pathname, query, params}) {
    progressStart();
    return Promise.all([
      menuActions.setTDK(states, '列表'),
      jobActions.fetchJobList(states, query)
    ]);
}
```

## How to redirect on the server side?

In `src/helpers/location.js`, there is a `redirect` function, you can just import it and use.
The `catchErr` in `src/serverRender.js` will catch the redirect command and redirect as you wish.
It works on both server and client side.

```
import {redirect} from './helpers/location';

@action
static onEnter({states, query, params}) {
    redirect('http://www.xxx.com');
}
```
