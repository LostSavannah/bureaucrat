FROM node:latest as frontend

WORKDIR /app

COPY ./frontend .
RUN npm i

ARG BUREAUCRAT_API_HOST=http://localhost:19970
ARG BUREAUCRAT_SITE_BASENAME=/
RUN echo VITE_API_URL=${BUREAUCRAT_API_HOST} > .env
RUN echo VITE_BASENAME=${BUREAUCRAT_SITE_BASENAME} >> .env

RUN npm run build

FROM python:latest as documentation

WORKDIR /app

RUN pip install jinja2
COPY ./build_templates.py .
COPY ./documentation.json .
COPY ./templates ./templates
RUN mkdir ./site
RUN python3 ./build_templates.py

FROM python:latest as main

WORKDIR /bureaucrat

ENV BUREAUCRAT_TABLES_DATABASE=/bureaucrat/data/tables
ENV BUREAUCRAT_TEMPLATES_DATABASE=/bureaucrat/data/templating/templates.db
ENV BUREAUCRAT_BLOBS_ROOT=/bureaucrat/data/blobs
ENV BUREAUCRAT_TREES_ROOT=/bureaucrat/data/trees
ENV BUREAUCRAT_STATIC_PATH=/bureaucrat/frontend
ENV BUREAUCRAT_WORKERS_ROOT=/bureaucrat/api
ENV BUREAUCRAT_WORKERS_PACKAGE=workers
ENV BUREAUCRAT_API_HOST: 0.0.0.0
ENV BUREAUCRAT_API_PORT: 19970

RUN mkdir -p $BUREAUCRAT_TABLES_DATABASE $BUREAUCRAT_BLOBS_ROOT $BUREAUCRAT_TREES_ROOT

COPY ./api/requirements.txt ./api/
RUN pip install -r ./api/requirements.txt
COPY ./default /bureaucrat/data

COPY --from=frontend /app/dist ./frontend
COPY --from=documentation /app/site ./frontend/doc
COPY ./api ./api

CMD ["python", "/bureaucrat/api/index.py"]