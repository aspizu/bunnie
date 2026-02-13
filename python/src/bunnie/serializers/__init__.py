from typing import Protocol

__all__ = ["Serializer"]


class Serializer(Protocol):
    def __call__(self, obj: object) -> str: ...
