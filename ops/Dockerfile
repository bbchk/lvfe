FROM node:lts-slim AS base
RUN npm install -g pnpm@latest-10

RUN apt-get update 
RUN apt-get install curl -y

ARG APP_GROUP_ID="1000"
ARG APP_USER_ID="1000"

# RUN getent group $APP_GROUP_ID || groupmod -g $APP_GROUP_ID nobody && \
#     getent passwd $APP_USER_ID || usermod -u $APP_USER_ID nobody

ENV HOME="/var/www"
ENV APP_HOME="${HOME}/app" \
    APP_PORT="3000"

COPY ops/bin/pre-run /usr/bin/pre-run

RUN mkdir -p ${APP_HOME} && \
  chown -R ${APP_USER_ID}:${APP_GROUP_ID} "${HOME}" "${APP_HOME}"

WORKDIR $APP_HOME
EXPOSE $APP_PORT

USER ${APP_USER_ID}:${APP_GROUP_ID}

# ------------------------------------------------------
# Development stages below
#-------------------------------------------------------
FROM base AS development

ENV NODE_ENV=development

VOLUME $APP_HOME

ENTRYPOINT ["pre-run"]
CMD [ "pnpm", "run", "dev" ]

# ------------------------------------------------------
# Production stages below
#-------------------------------------------------------
FROM base AS production

ENV NODE_ENV=production

COPY --chown=${APP_USER_ID}:${APP_GROUP_ID} src/package.json src/pnpm-lock.yaml $APP_HOME

RUN pnpm ci

COPY --chown=$APP_USER_ID:$APP_GROUP_ID src $APP_HOME/

ENTRYPOINT ["pre-run"]
CMD ["pnpm", "run", "start"]
