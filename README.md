# images-gql
This is the GraphQL backend for a image service

### Prerequisites
This is a node server application relying on **node v10** or above.
Please make sure you have **yarn** installed as well.

Use this command to install yarn (it will install node if you don't have it installed already)
```
brew install yarn
```

use this command if you already have node installed
```
brew install yarn --without-node
```

## Getting Started
```
yarn && yarn start
```

This will install all dependencies and start the server. The GraphQL endpoint will be exposed on port 4000. The File Server will be exposed on port 3000 by default.

## Testing
run all tests:
```
yarn test
```
