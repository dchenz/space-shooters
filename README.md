# Space Shooters

## Build project locally

```sh
cd space-shooters

yarn install
yarn build

# visit http://localhost:8000
python3 -m http.server --directory dist
```

## Build project using Docker

```sh
cd space-shooters

docker build . -t space-shooters

# visit http://localhost:8000
docker run -p 8000:80 space-shooters
```
