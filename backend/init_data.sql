create database main_hub;

drop table if exists user;

create table user
(id integer auto_increment primary key,
username varchar(30) unique not null,
password_hash varchar(255) not null,
email varchar(255) unique not null,
created_dt datetime not null
);

CREATE TABLE `user_sessions` (
  `id` VARCHAR(36) NOT NULL,
  `user_id` INT NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expires_at` DATETIME NOT NULL,
  `revoked_at` DATETIME NULL,

  PRIMARY KEY (`id`),

  KEY `ix_user_sessions_user_id` (`user_id`),
  KEY `ix_user_sessions_valid` (`user_id`, `expires_at`, `revoked_at`),

  CONSTRAINT `fk_user_sessions_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `user`(`id`)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
