ARG BUREAUCRAT_API_HOST=http://localhost:19760

FROM ubuntu:latest as configuration
WORKDIR /app
RUN echo VITE_API_URL=${BUREAUCRAT_API_HOST} > .env


FROM node:latest as frontend

WORKDIR /app

COPY ./frontend .
COPY --from=configuration /app .

RUN npm i
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
ENV BUREAUCRAT_BLOBS_ROOT=/bureaucrat/data/blobs
ENV BUREAUCRAT_TREES_ROOT=/bureaucrat/data/trees
ENV BUREAUCRAT_STATIC_PATH=/bureaucrat/frontend

RUN mkdir -p $BUREAUCRAT_TABLES_DATABASE $BUREAUCRAT_BLOBS_ROOT $BUREAUCRAT_TREES_ROOT

COPY ./api/requirements.txt ./api/
RUN pip install -r ./api/requirements.txt
COPY ./default /bureaucrat/data
COPY ./api ./api

COPY --from=frontend /app/dist ./frontend
COPY --from=documentation /app/site ./frontend/doc

CMD ["python", "/bureaucrat/api/index.py"]