from ubuntu:latest

workdir /bureaucrat

env BUREAUCRAT_TABLES_DATABASE=/bureaucrat/data/tables
env BUREAUCRAT_BLOBS_ROOT=/bureaucrat/data/blobs
env BUREAUCRAT_TREES_ROOT=/bureaucrat/data/trees

run mkdir -p $BUREAUCRAT_TABLES_DATABASE $BUREAUCRAT_BLOBS_ROOT $BUREAUCRAT_TREES_ROOT

run apt-get update
run apt-get install -y python3.11 python3-venv python3-pip

copy ./api ./api

run pip install -r ./api/requirements.txt

copy ./entrypoint.sh ./entrypoint.sh
run chmod +x ./entrypoint.sh

copy ./frontend/dist ./frontend

cmd ./entrypoint.sh