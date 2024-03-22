-- Ce script SQL vérifie si le schéma 'app' existe dans la base de données.
SELECT schema_name 
FROM information_schema.schemata 
WHERE schema_name = 'app';

