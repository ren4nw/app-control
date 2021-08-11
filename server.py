from aiohttp import web
import socketio
import pyautogui
import socket
import pyqrcode

s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.connect(("8.8.8.8", 80))

localip = s.getsockname()[0]

s.close()

PUBLIC_DIR = './app-control/build'

pyautogui.FAILSAFE = False

class Control:

    def move(direction, speed = 'fast'):
        offset = 100 if speed == 'fast' else 8

        x, y = pyautogui.position()

        if direction == 'left':
            pyautogui.moveTo(x - offset, y)
        elif direction == 'right':
            pyautogui.moveTo(x + offset, y)
        elif direction == 'up':
            pyautogui.moveTo(x, y - offset)
        elif direction == 'down':
            pyautogui.moveTo(x, y + offset)
    
    def click(direction):
        pyautogui.click(button=direction)
    
    def type(key):
        if key == '.com':
            pyautogui.write('.com')
            return
        
        pyautogui.press(key)
    
    def scroll(direction):
        default_scroll_offset = 12
        offset = -default_scroll_offset if direction == 'down' else default_scroll_offset

        pyautogui.scroll(offset)
        


sio = socketio.AsyncServer()
app = web.Application()
sio.attach(app)

async def index(request):
    """Serve the client-side application."""
    with open(f'{PUBLIC_DIR}/index.html') as f:
        return web.Response(text=f.read(), content_type='text/html')

@sio.on('move')
def response_ping(sid, data = {}):
    direction = data.get('direction')
    speed = data.get('speed')

    Control.move(direction, speed=speed)

@sio.on('click')
def click(sid, data = {}):
    direction = data.get('direction')

    Control.click(direction)

@sio.on('type')
def type(sid, data = {}):
    key = data.get('key')

    Control.type(key)

@sio.on('scroll')
def scroll(sid, data = {}):
    direction = data.get('direction')

    Control.scroll(direction)

@sio.event
def connect(sid, environ):
    print("connect ", sid)

@sio.event
async def chat_message(sid, data):
    print("message ", data)

@sio.event
def disconnect(sid):
    print('disconnect ', sid)


app.router.add_static('/static', f'{PUBLIC_DIR}/static')
app.router.add_get('/', index)

app_url = f'http://{localip}:8080'

url = pyqrcode.create(app_url)

print(url.terminal(quiet_zone=1))
print(f'* Para utilizar o app acesse: {app_url}\n')

if __name__ == '__main__':
    web.run_app(app)
