from unittest import TestCase

from fastapi.testclient import TestClient

from app.core.config import Settings
from app.main import create_app


class HealthTests(TestCase):
    def test_health_returns_ok(self) -> None:
        with TestClient(create_app()) as client:
            response = client.get("/api/v1/health")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "ok"})

    def test_cors_uses_configured_origins(self) -> None:
        origin = "http://localhost:3000"
        settings = Settings(_env_file=None, allowed_origins=[origin])
        with TestClient(create_app(settings)) as client:
            allowed = client.options(
                "/api/v1/health",
                headers={"Origin": origin, "Access-Control-Request-Method": "GET"},
            )
            denied = client.get(
                "/api/v1/health", headers={"Origin": "https://example.invalid"}
            )

        self.assertEqual(allowed.status_code, 200)
        self.assertEqual(allowed.headers["access-control-allow-origin"], origin)
        self.assertNotIn("access-control-allow-origin", denied.headers)
