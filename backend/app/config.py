from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    app_name: str = "Dev Learning Lab API"
    debug: bool = True
    database_url: str = "postgresql://devlab:devlab@localhost:5432/devlab"
    mongodb_url: str = "mongodb://devlab:devlab@localhost:27017/devlab?authSource=admin"
    jwt_secret: str = "dev-learning-lab-change-me-in-production"
    jwt_algorithm: str = "HS256"
    jwt_expire_minutes: int = 60 * 24 * 7


settings = Settings()
