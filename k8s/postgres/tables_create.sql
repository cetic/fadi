-- Table: public.raw_data

-- DROP TABLE public.raw_data;

CREATE TABLE public.raw_data
(   device_id integer not null,
    channel_id integer not null,
    name text COLLATE pg_catalog."default",
    msg_dt timestamp without time zone NOT NULL,
    serial_number bigint NOT NULL,
    channel_name text COLLATE pg_catalog."default",
    value numeric,
    latitude numeric,
    longitude numeric,
    tlm_type integer NOT NULL,
    location text,
    CONSTRAINT raw_data_pkey PRIMARY KEY (serial_number, device_id, channel_id, tlm_type, msg_dt)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.raw_data
    OWNER to postgres;

    -- Table: public.raw_data_tlm1

    -- DROP TABLE public.raw_data_tlm1;

    CREATE TABLE public.raw_data_tlm_1
    (
          device_id integer not null,
          channel_id integer not null,
          name text COLLATE pg_catalog."default",
          msg_dt timestamp without time zone NOT NULL,
          serial_number bigint NOT NULL,
          channel_name text COLLATE pg_catalog."default",
          value numeric,
          latitude numeric,
          longitude numeric,
          location text,
          CONSTRAINT raw_data_tlm1_pkey PRIMARY KEY (serial_number, device_id, channel_id, msg_dt)
    )
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;

    ALTER TABLE public.raw_data_tlm_1
        OWNER to postgres;


        -- Table: public.raw_data_tlm5

      -- DROP TABLE public.raw_data_tlm5;

  CREATE TABLE public.raw_data_tlm_5
      (
        device_id integer not null,
        channel_id integer not null,
        name text COLLATE pg_catalog."default",
        msg_dt timestamp without time zone NOT NULL,
        serial_number bigint NOT NULL,
        channel_name text COLLATE pg_catalog."default",
        value numeric,
        latitude numeric,
        longitude numeric,
        location text,
        CONSTRAINT raw_data_tlm5_pkey PRIMARY KEY (serial_number, device_id, channel_id, msg_dt)
      )
      WITH (
          OIDS = FALSE
      )
      TABLESPACE pg_default;

      ALTER TABLE public.raw_data_tlm_5
          OWNER to postgres;
