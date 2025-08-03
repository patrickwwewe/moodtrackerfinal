import http.server
import socketserver
import webbrowser
import os
from time import sleep

# Configure the server
PORT = 8000
Handler = http.server.SimpleHTTPRequestHandler

print(f"Starting server on port {PORT}...")

# Start the server in a way that allows it to be stopped with Ctrl+C
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    # Open the browser
    webbrowser.open(f'http://localhost:{PORT}')
    print(f"Server started at http://localhost:{PORT}")
    print("Press Ctrl+C to stop the server.")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server...")
        httpd.shutdown()
