import http.server
import socketserver
import webbrowser
import os
from time import sleep

# Configure the server
def find_free_port(start_port=8000, max_attempts=100):
    for port in range(start_port, start_port + max_attempts):
        try:
            # Test if port is available
            with socketserver.TCPServer(("", port), Handler):
                return port
        except OSError:
            continue
    raise OSError("No free ports found")

Handler = http.server.SimpleHTTPRequestHandler
PORT = find_free_port()

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
