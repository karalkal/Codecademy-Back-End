CREATE OR REPLACE FUNCTION update_style_count()
  RETURNS trigger AS
$BODY$
BEGIN
    new.geom := ST_SetSRID(ST_MakePoint(new.longitude, new.latitude), 4326);
    RETURN new;
END;
$BODY$
LANGUAGE plpgsql;
