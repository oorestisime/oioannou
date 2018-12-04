---
path: /tornado
title: Mixing Tornado Flask and Websockets
date: 2015-02-20
tags: ["python","Tornado","Flask","WebSockets"]
photo: ./img/tornado.jpg
---

Part of my research project ([moar details](/2015/research)), was to create an application that would measure and illustrate the process of voting on the internet using elliptic curves. A major part of that was to create the mixnets and having a server (backend) communicating with the mixnets as a server-client communication.

I chose to implement this, using WebSockets. I ended up choosing [Tornado](http://tornadoweb.org/) for the backend and [Flask](http://flask.pocoo.org/) for the frontend and I implemented a mixnet client using the Python's websocket library. One of the challenging parts (I thought) was to make tornado and flask coexist as well as making requests from Flask to the WebSockets. So this is a small tutorial on how to make these work.

The basic Flask configuration stays the same (routing urls, rendering templates forms etc). To create the WebSocket class you need the following:

```python
class WSHandler(websocket.WebSocketHandler):
    clients = []
    def open(self):
        WSHandler.clients.append(self)
        print 'connection opened...'

    def on_message(self, message):
        # application logic
        print 'received:', message
        self.write_message("Roger that")

    def on_close(self):
        WSHandler.clients.remove(self)
        print 'connection closed...'
```

As you can see this class can handle multiple clients using a list. The on_message function is the one receiving a message and responding. So then what you need is to configure Tornado to route requests to the WebSocket handler and to Flask for the web application logic. And here's how:

```python
app = Flask(__name__)
app.config.from_object(__name__)
app.config.from_envvar('FLASKR_SETTINGS', silent=True)
tr = WSGIContainer(app)

application = web.Application([
    (r'/ws', WSHandler),
    (r".*", web.FallbackHandler, dict(fallback=tr)),
])
```

And finally a bit of code at the main function to set the IOloop running:

```python
if __name__ == "__main__":
    application.listen(8000)
    tornado.ioloop.IOLoop.instance().start()
```

So now if you configure your urls you should be getting requests to flask from a web browser and if you configure a python client you could get it to communicate with the WebSocket handler. A minimum client could be something like:

```python
from websocket import create_connection
if __name__ == "__main__":
    ws = create_connection("ws://localhost:8000/ws")
    print("Sending 'Hello, World'...")
    ws.send("Hello, World")
    print("Sent")
    print("Receiving...")
    result = ws.recv()
```

You can also set this in an infinite loop to keep the connection alive.
```python
while True:
    _ = ws.recv()
    print _
    if _ == None:
        break
    elif _ == "Hello":
        # do something
```


This is a basic configuration on how to mix Tornado Flask and WebSockets. Now things are getting more interesting when you try to send a request to the WebSockets from Flask. What I needed is when a user submits a request the mixnets would mix and return back the information. To do that You need two things. First is a function that has a @classmethod decorator

```python
@classmethod
def call_from_outside(parameter):
   #Application logic
```

and the second is how to enable Flask to call this method.

```python
@app.route('/over')
def over():
    tornado.ioloop.IOLoop.instance().add_callback(WSHandler.call_from_outside)
    # Application logic
```

And that's all. You can find the code on my github [repo](https://github.com/oorestisime/elliptic_curves) although it contains the logic for my research project.

Hope this was helpful to you
