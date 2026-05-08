import traceback
from contextlib import asynccontextmanager

import asyncpg
import structlog
from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from slowapi.errors import RateLimitExceeded
from starlette.exceptions import HTTPException as StarletteHTTPException

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
    visitor,
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
app.include_router(visitor.router)


@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(
    request: Request, exc: StarletteHTTPException
) -> JSONResponse:
    return JSONResponse(status_code=exc.status_code, content={"detail": exc.detail})


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(
    request: Request, exc: RequestValidationError
) -> JSONResponse:
    return JSONResponse(status_code=422, content={"detail": exc.errors()})


@app.exception_handler(RateLimitExceeded)
async def rate_limit_handler(request: Request, exc: RateLimitExceeded) -> JSONResponse:
    return JSONResponse(status_code=429, content={"detail": "Too many requests"})


@app.exception_handler(asyncpg.PostgresError)
async def postgres_exception_handler(
    request: Request, exc: asyncpg.PostgresError
) -> JSONResponse:
    logger.error(
        "database_error",
        method=request.method,
        path=request.url.path,
        error=str(exc),
    )
    return JSONResponse(status_code=500, content={"detail": "Database error"})


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
