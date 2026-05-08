from uuid import UUID

from pydantic import BaseModel


class SkillCreate(BaseModel):
    name: str
    category: str
    cluster: str
    icon_devicon: str | None = None
    mastery_level: int | None = None
    featured: bool = False
    display_order: int = 0


class SkillUpdate(BaseModel):
    name: str | None = None
    category: str | None = None
    cluster: str | None = None
    icon_devicon: str | None = None
    mastery_level: int | None = None
    featured: bool | None = None
    display_order: int | None = None


class SkillResponse(BaseModel):
    id: UUID
    name: str
    category: str
    cluster: str
    icon_devicon: str | None
    mastery_level: int | None
    featured: bool
    display_order: int
