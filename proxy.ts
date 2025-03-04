import WebSocket, { WebSocketServer } from "ws";

type User = "client" | "server";

const clients = new Map<number, WebSocket>();
const servers = new Map<number, WebSocket>();

function clientHandler(id: number, data: WebSocket.RawData) {
    const server = servers.get(id);
    if (server) {
        const ser = data.toString();
        server.send(ser);
    }
}

function serverHandler(id: number, data: WebSocket.RawData) {
    const client = clients.get(id);
    if (client) {
        const ser = data.toString();
        client.send(ser);
    }
}

const wss = new WebSocketServer({
    port: 3001,
});

wss.on("connection", (ws, req) => {
    const params = new URLSearchParams(req.url!.substring(1));
    const user = params.get("user") as User;
    const id = Number(params.get("id"));

    if (user === "client") {
        let client = clients.get(id);
        if (client) {
            client.close();
        }
        clients.set(id, ws);
        ws.on("message", (data) => clientHandler(id, data));
        ws.on("close", () => {
            clients.delete(id);
        });
    } else { // if (user === "server")
        let server = servers.get(id);
        if (server) {
            server.close();
        }
        servers.set(id, ws);
        ws.on("message", (data) => serverHandler(id, data));
        ws.on("close", () => {
            servers.delete(id);
        });
    }
});
