CREATE SCHEMA IF NOT EXISTS salesforce;

CREATE TABLE IF NOT EXISTS salesforce.contact (
    id              BIGSERIAL,
    firstName       TEXT,
    lastName        TEXT,
    email           TEXT,
    mobilePhone     TEXT,
    leadsource      TEXT,
    accountid       TEXT,
    password__c     TEXT,
    createddate     timestamp
  );

CREATE TABLE IF NOT EXISTS salesforce.session__c (
    sfid character varying(18),
    name character varying(80),
    venue__c character varying(18),
    createddate timestamp without time zone,
    isdeleted boolean,
    level__c character varying(255),
    session_date__c date,
    id serial NOT NULL,
    description__c text,
    CONSTRAINT session__c_pkey PRIMARY KEY (id)
  );
  
CREATE TABLE IF NOT EXISTS salesforce.hotel__c (
    location__latitude__s double precision,
    location__longitude__s double precision,
    name character varying(80),
    id serial NOT NULL,
    CONSTRAINT hotel__c_pkey PRIMARY KEY (id)
);