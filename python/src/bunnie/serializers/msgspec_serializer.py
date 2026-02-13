import msgspec.json


def MsgspecSerializer(obj: object) -> str:
    return msgspec.json.encode(obj).decode()
