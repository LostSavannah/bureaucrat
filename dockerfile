FROM ubuntu:latest

WORKDIR /bureaucrat

ENV BUREAUCRAT_TABLES_DATABASE=/bureaucrat/data/tables
ENV BUREAUCRAT_BLOBS_ROOT=/bureaucrat/data/blobs
ENV BUREAUCRAT_TREES_ROOT=/bureaucrat/data/trees

RUN mkdir -p $BUREAUCRAT_TABLES_DATABASE $BUREAUCRAT_BLOBS_ROOT $BUREAUCRAT_TREES_ROOT

RUN apt-get update
RUN apt-get install -y python3.11 python3-venv python3-pip

COPY ./api/requirements.txt ./api/

RUN pip install -r ./api/requirements.txt

COPY ./default /bureaucrat/data

COPY ./api ./api

COPY ./entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

COPY ./frontend/dist ./frontend

CMD ./entrypoint.sh