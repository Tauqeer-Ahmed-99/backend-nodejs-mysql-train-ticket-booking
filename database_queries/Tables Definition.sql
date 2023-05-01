CREATE TABLE `train_ticket_management`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(45) NOT NULL,
  `user_email` VARCHAR(45) NOT NULL,
  `user_phone` VARCHAR(45) NOT NULL,
  `user_address` VARCHAR(200) NOT NULL,
  `password_hash` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE,
  UNIQUE INDEX `user_name_UNIQUE` (`user_name` ASC) VISIBLE,
  UNIQUE INDEX `user_email_UNIQUE` (`user_email` ASC) VISIBLE,
  UNIQUE INDEX `user_phone_UNIQUE` (`user_phone` ASC) VISIBLE
  );
  
CREATE TABLE `train_ticket_management`.`stations` (
  `station_id` VARCHAR(10) NOT NULL,
  `station_name` VARCHAR(50) NOT NULL,
  `distance_from_origin` INT NOT NULL,
  PRIMARY KEY(`station_id`),
  UNIQUE INDEX `station_id_UNIQUE` (`station_id` ASC) VISIBLE,
  UNIQUE INDEX `station_name_UNIQUE` (`station_name` ASC) VISIBLE
  );
  
CREATE TABLE `train_ticket_management`.`ticket_classes` (
  `ticket_class_id` VARCHAR(10) NOT NULL,
  `ticket_class_name` VARCHAR(10) NOT NULL,
  PRIMARY KEY(`ticket_class_id`),
  UNIQUE INDEX `ticket_class_id_UNIQUE` (`ticket_class_id` ASC) VISIBLE,
  UNIQUE INDEX `ticket_class_name_UNIQUE` (`ticket_class_name` ASC) VISIBLE
  );

CREATE TABLE `train_ticket_management`.`ticket_fare` (
  `distance` INT NOT NULL,
  `fare` INT NOT NULL,
  `ticket_class` VARCHAR(20) NOT NULL, 
  `ticket_type` VARCHAR(45) NOT NULL, 
  PRIMARY KEY(`distance`),
  FOREIGN KEY (`ticket_class`) REFERENCES `train_ticket_management`.`ticket_classes`(ticket_class_id),
  FOREIGN KEY (`ticket_type`) REFERENCES `train_ticket_management`.`ticket_types`(ticket_type_id),
  UNIQUE INDEX `distance_UNIQUE` (`distance` ASC) VISIBLE,
  UNIQUE INDEX `fare_UNIQUE` (`fare` ASC) VISIBLE
  );
  
CREATE TABLE `train_ticket_management`.`ticket_types` (
  `ticket_type_id` VARCHAR(10) NOT NULL,
  `ticket_type_name` VARCHAR(20) NOT NULL,
  PRIMARY KEY(`ticket_type_id`),
  UNIQUE INDEX `ticket_type_id_UNIQUE` (`ticket_type_id` ASC) VISIBLE,
  UNIQUE INDEX `ticket_type_name_UNIQUE` (`ticket_type_name` ASC) VISIBLE
  );  
  
CREATE TABLE `train_ticket_management`.`tickets` (
  `ticket_id` INT NOT NULL AUTO_INCREMENT,
  `ticket_type` VARCHAR(45) NOT NULL,
  `ticket_class` VARCHAR(45) NOT NULL,
  `start_station` VARCHAR(50) NOT NULL,
  `end_station` VARCHAR(50) NOT NULL,
  `registration_date` VARCHAR(200) NOT NULL,
  `expire_date` VARCHAR(200) NOT NULL,
  `user_id` INT NOT NULL,
  `adult_count` INT NOT NULL,
  `child_count` INT NOT NULL,
  `fare` INT NOT NULL,
  PRIMARY KEY (`ticket_id`),
  FOREIGN KEY (`user_id`) REFERENCES `train_ticket_management`.`users`(user_id),
  FOREIGN KEY (`ticket_type`) REFERENCES `train_ticket_management`.`ticket_types`(ticket_type_id),
  FOREIGN KEY (`ticket_class`) REFERENCES `train_ticket_management`.`ticket_classes`(ticket_class_id),
  FOREIGN KEY (`start_station`) REFERENCES `train_ticket_management`.`stations`(station_id),
  FOREIGN KEY (`end_station`) REFERENCES `train_ticket_management`.`stations`(station_id),
  UNIQUE INDEX `ticket_id_UNIQUE` (`ticket_id` ASC) VISIBLE
  );
