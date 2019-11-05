# What's the SSE?

- [Server Sent Events](https://www.w3.org/TR/2009/WD-eventsource-20090421/)

# What's this?

- If you create the new post or update or delete that, this app sends a notification to the client automatically.

# How to use?

- Clone this repo & Install the dependencies & Run

```
$ git clone https://github.com/hun-a/posting-notification-with-sse.git
$ cd posting-notification-with-sse && npm i && npm run dev
```

- Open the [client](./client/index.html) on your web browser.
  - Please replace the `INPUT_YOUR_API_ENDPOINT_HERE` to your valid API endpoints on [index.html](./client/index.html)

- If you execute `create`, `update`, `delete` API as below specifications, you can see the notification on your web browser.

### API Spec

- Create the post

```
curl -XPOST -d '{"title": "abc", "contents": "this is contents", "user": "hun-a" }' localhost:4000
```

- Select the post

```
curl -XGET localhost:4000/1
```

- Update the post

```
curl -XPUT -d '{"title": "abc", "contents": "Update", "user": "hun-a" }' localhost:4000/1
```

- Delete the post

```
curl -XDELETE localhost:4000/1
```

# License

- [MIT](./LICENSE)