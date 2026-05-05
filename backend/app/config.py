from pydantic_settings import BaseSettings ,SettingsConfigDict

class Settings(BaseSettings):

    modelConfig = SettingsConfigDict(env_file=".env", extra="ignore")

    app_name: str = "E_PORTFOLIO"
    app_env: str = "development"
    app_port: int = 8000
    app_debug: bool = True

    postgres_host: str 
    postgres_port: int = 5432
    postgres_user: str 
    postgres_password: str 
    postgres_db: str 

    redis_host: str = "localhost"   
    redis_port: int = 6379

    jwt_secret_key: str 
    jwt_algorithm: str = "HS256"
    jwt_access_token_expire_minutes: int = 30
    admin_email: str 
    admin_password: str

    @property
    def database_url(self) -> str:
        return( 
            f"postgresql://{self.postgres_user}:{self.postgres_password}"
            f"@{self.postgres_host}:{self.postgres_port}/{self.postgres_db}"
        )

settings = Settings()