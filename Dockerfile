FROM node:16.16 AS node

# Use production node environment by default.
ENV NODE_ENV=production

WORKDIR /app

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
RUN --mount=type=cache,target=/root/.npm \
	--mount=type=bind,rw,source=package.json,target=package.json \
	--mount=type=bind,rw,source=package-lock.json,target=package-lock.json \
	npm install

# Copy the rest of the source files into the image.
COPY . .

RUN npm run preprod

FROM python:3.10

# Prevents Python from writing pyc files.
ENV PYTHONDONTWRITEBYTECODE=1
# Keeps Python from buffering stdout and stderr to avoid situations where
# the application crashes without emitting any logs due to buffering.
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.cache/pip to speed up subsequent builds.
RUN --mount=type=cache,target=/root/.cache/pip pip install pipenv
# Install requirements from Pipfile but omit source url
RUN --mount=type=cache,target=/root/.cache/pip \
	--mount=type=bind,source=Pipfile,target=Pipfile \
	--mount=type=bind,source=Pipfile.lock,target=Pipfile.lock \
	pipenv requirements | tail +2 | xargs -d '\n' pip install

# Create a non-privileged user that the app will run under.
# See https://docs.docker.com/go/dockerfile-user-best-practices/
RUN adduser \
	--disabled-password \
	--gecos "" \
	--home "/nonexistent" \
	--shell "/sbin/nologin" \
	--no-create-home \
	--uid 10001 \
	appuser
RUN chown appuser:appuser .
# Switch to the non-privileged user to run the application.
USER appuser

# Copy the source code into the container.
COPY --chown=appuser:appuser . .
COPY --from=node --chown=appuser:appuser /app/dist dist

EXPOSE 3000
CMD uwsgi --module src.server:app --http 0.0.0.0:3000 --master