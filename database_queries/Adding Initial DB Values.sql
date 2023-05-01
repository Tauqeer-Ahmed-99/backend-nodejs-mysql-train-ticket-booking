USE train_ticket_management;

/* Adding TICKET TYPES to DB */
DESCRIBE ticket_types;

SELECT * FROM ticket_types;
INSERT INTO ticket_types (ticket_type_id, ticket_type_name) VALUES ('JNY', 'SINGLE JOURNEY');
INSERT INTO ticket_types (ticket_type_id, ticket_type_name) VALUES ('RTN', 'RETURN JOURNEY');
INSERT INTO ticket_types (ticket_type_id, ticket_type_name) VALUES ('SSN', 'SEASON TICKET');
INSERT INTO ticket_types (ticket_type_id, ticket_type_name) VALUES ('PLT', 'PLATFORM TICKET');

/* Adding TICKET CLASS to DB */
DESCRIBE ticket_classes;

SELECT * FROM ticket_classes; 

ALTER TABLE ticket_classes
	MODIFY ticket_class_name VARCHAR(20) NOT NULL;
 
INSERT INTO ticket_classes (ticket_class_id, ticket_class_name) VALUES ('I', 'FIRST CLASS');
INSERT INTO ticket_classes (ticket_class_id, ticket_class_name) VALUES ('II', 'SECOND CLASS');
INSERT INTO ticket_classes (ticket_class_id, ticket_class_name) VALUES ('AC', 'AIR CONDITIONED');

/* Adding TICKET FARES to DB */
DESCRIBE ticket_fare;

SELECT * FROM ticket_fare 
ORDER BY distance;

ALTER TABLE `train_ticket_management`.`ticket_fare` 
DROP INDEX `fare_UNIQUE` ,
DROP INDEX `distance_UNIQUE` ,
DROP PRIMARY KEY;

ALTER TABLE ticket_fare 
ADD CONSTRAINT COMPOSITE_KEY PRIMARY KEY(distance, ticket_class, ticket_type);

INSERT INTO ticket_fare (distance, fare, ticket_class, ticket_type) VALUES (15, 5, 'II', 'JNY');
INSERT INTO ticket_fare (distance, fare, ticket_class, ticket_type) VALUES (30, 10, 'II', 'JNY');
INSERT INTO ticket_fare (distance, fare, ticket_class, ticket_type) VALUES (55, 15, 'II', 'JNY');
INSERT INTO ticket_fare (distance, fare, ticket_class, ticket_type) VALUES (85, 20, 'II', 'JNY');
INSERT INTO ticket_fare (distance, fare, ticket_class, ticket_type) VALUES (100, 25, 'II', 'JNY');
INSERT INTO ticket_fare (distance, fare, ticket_class, ticket_type) VALUES (115, 30, 'II', 'JNY');
INSERT INTO ticket_fare (distance, fare, ticket_class, ticket_type) VALUES (120, 35, 'II', 'JNY');

INSERT INTO ticket_fare (distance, fare, ticket_class, ticket_type) VALUES (15, 50, 'I', 'JNY');
INSERT INTO ticket_fare (distance, fare, ticket_class, ticket_type) VALUES (25, 105, 'I', 'JNY');
INSERT INTO ticket_fare (distance, fare, ticket_class, ticket_type) VALUES (35, 140, 'I', 'JNY');
INSERT INTO ticket_fare (distance, fare, ticket_class, ticket_type) VALUES (40, 145, 'I', 'JNY');
INSERT INTO ticket_fare (distance, fare, ticket_class, ticket_type) VALUES (45, 150, 'I', 'JNY');
INSERT INTO ticket_fare (distance, fare, ticket_class, ticket_type) VALUES (50, 160, 'I', 'JNY');
INSERT INTO ticket_fare (distance, fare, ticket_class, ticket_type) VALUES (55, 165, 'I', 'JNY');
INSERT INTO ticket_fare (distance, fare, ticket_class, ticket_type) VALUES (65, 170, 'I', 'JNY');
INSERT INTO ticket_fare (distance, fare, ticket_class, ticket_type) VALUES (85, 195, 'I', 'JNY');
INSERT INTO ticket_fare (distance, fare, ticket_class, ticket_type) VALUES (95, 210, 'I', 'JNY');
INSERT INTO ticket_fare (distance, fare, ticket_class, ticket_type) VALUES (105, 240, 'I', 'JNY');
INSERT INTO ticket_fare (distance, fare, ticket_class, ticket_type) VALUES (120, 245, 'I', 'JNY');

INSERT INTO ticket_fare (distance, fare, ticket_class, ticket_type) VALUES (15, 60, 'ACusersusers', 'JNY');
INSERT INTO ticket_fare (distance, fare, ticket_class, ticket_type) VALUES (25, 125, 'AC', 'JNY');
INSERT INTO ticket_fare (distance, fare, ticket_class, ticket_type) VALUES (35, 165, 'AC', 'JNY');
INSERT INTO ticket_fare (distance, fare, ticket_class, ticket_type) VALUES (45, 175, 'AC', 'JNY');
INSERT INTO ticket_fare (distance, fare, ticket_class, ticket_type) VALUES (55, 190, 'AC', 'JNY');
INSERT INTO ticket_fare (distance, fare, ticket_class, ticket_type) VALUES (65, 205, 'AC', 'JNY');
INSERT INTO ticket_fare (distance, fare, ticket_class, ticket_type) VALUES (75, 230, 'AC', 'JNY');
INSERT INTO ticket_fare (distance, fare, ticket_class, ticket_type) VALUES (85, 235, 'AC', 'JNY');
INSERT INTO ticket_fare (distance, fare, ticket_class, ticket_type) VALUES (95, 255, 'AC', 'JNY');
INSERT INTO ticket_fare (distance, fare, ticket_class, ticket_type) VALUES (110, 285, 'AC', 'JNY');
INSERT INTO ticket_fare (distance, fare, ticket_class, ticket_type) VALUES (120, 295, 'AC', 'JNY');

INSERT INTO ticket_fare (distance, fare, ticket_class, ticket_type) VALUES (0, 5, 'AC', 'PLT');