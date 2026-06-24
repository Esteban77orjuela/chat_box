FROM python:3.12-slim AS builder
WORKDIR /app
RUN apt-get update && apt-get install -y build-essential && rm -rf /var/lib/apt/lists/*
COPY requirements.txt ./
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

FROM python:3.12-slim AS runtime
WORKDIR /app
COPY --from=builder /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY app ./app
COPY .env.example ./.env.example
EXPOSE 8000
CMD ["uvicorn", "app.main:socket_app", "--host", "0.0.0.0", "--port", "8000"]
