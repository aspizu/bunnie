import httpx

from .serializers import Serializer


class Bunnie:
    def __init__(self, serializer: Serializer | None = None) -> None:
        if serializer is None:
            from .serializers.pydantic_serializer import PydanticSerializer

            self._serialzer: Serializer = PydanticSerializer
        else:
            self._serialzer = serializer
        self._transport = httpx.AsyncHTTPTransport(uds="/tmp/bunnie.sock")
        self._client = httpx.AsyncClient(transport=self._transport)

    async def render(self, component: str, props: object | None = None) -> str:
        response = await self._client.post(
            "http://localhost:3000/",
            content=self._serialzer({"component": component, "props": props}),
        )
        response.raise_for_status()
        return response.text
