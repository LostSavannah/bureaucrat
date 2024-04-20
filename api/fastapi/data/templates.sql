--Database to be saved in ../default/templating/templates.db

DROP TABLE IF EXISTS Templates;
CREATE TABLE Templates(
    id TEXT,
    templateBody TEXT
);