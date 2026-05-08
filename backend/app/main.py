import traceback
from contextlib import asynccontextmanager

import structlog
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from app.core.database import close_pool
from app.core.logging_config import setup_logging
from app.core.middleware import (
    RequestLoggingMiddleware,
)
from app.routers import (
    auth,
    certifications,
    experience,
    health,
    learning_item,
    message,
    ml_model,
    profile,
    projects,
    skills,
)

logger = structlog.get_logger()


@asynccontextmanager
async def lifespan(app: FastAPI):
    setup_logging()
    logger.info("startup", message="API starting up")
    yield
    await close_pool()
    logger.info("shutdown", message="API shutting down")


app = FastAPI(
    title="Portfolio API",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(RequestLoggingMiddleware)
app.include_router(health.router)
app.include_router(projects.router)
app.include_router(profile.router)
app.include_router(message.router)
app.include_router(auth.router)
app.include_router(ml_model.router)
app.include_router(experience.router)
app.include_router(certifications.router)
app.include_router(learning_item.router)
app.include_router(skills.router)


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    logger.error(
        "unhandled_exception",
        method=request.method,
        path=request.url.path,
        error=str(exc),
        traceback=traceback.format_exc(),
    )
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"},
    )
