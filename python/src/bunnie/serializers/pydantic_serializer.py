import json

from pydantic import BaseModel


def PydanticSerializer(obj: object) -> str:
    if isinstance(obj, BaseModel):
        return obj.model_dump_json()
    return json.dumps(obj)
