# Technical design FAQs

## Core Technologies involved

* React.js
* Redux observables
* Next.js
* RxJS
* Apollo GraphQL client
* GraphQL websocket subscriptions
* Web3.js
* AntDesign component library customized via LESS vars
* Styled components with Theme provider
* Flowtype

## Why these?

1.  React.js, versbosity of the JSX language and component life cycle control essentially
2.  Redux observables middleware to handle asynchronous calls while still adhering to a FSM model and devtool timeline integration
3.  Next.js for SEO due to isomorphic server side rendering and async bundle chunks downloading per page
4.  RxJS due to an AIO unified functional async API, being able to throw different async clients such as Apollo and Web3.js and native DOM events whiile piping them in an observables stream design pattern
5.  Apollo GraphQL client mainly due to the way it handles component lifecycle methods with a versbose GraphQL request along with its built-in cache and server side rendering capabilities
6.  GraphQL websocket subscriptions to listen for the backend Kafka processed jobs once blockchain transactional events have been filtered out
7.  Web3.js for saving the planet
8.  AntDesign component library for a base frontend visual component framework
9.  Styled components for overriding AntD styling and localising the css per React component, lessening the layers between React state and visual css changes + server side rendering
10. Flowtypes for optional static types on top of JS, introspected the Apollo GraphQL schema for DSL Flowtypes. Flow-runtime is installed too for runtime error checking generated from Flowtypes!
