//------User credential------

CREATE TABLE users (
  id int primary key auto_increment,
  name varchar(50) NOT NULL,
  email varchar(50) NOT NULL,
  mobile_number varchar(10) NOT NULL,
  password varchar(50) NOT NULL COMMENT 'password in encryp format',
  dob DATE  COMMENT 'birth date',
  registration_date DATETIME NOT NULL,
  gender varchar(1)  COMMENT 'F or M',
  country varchar(20) ,
  zipcode varchar(10),
  is_blocked varchar(1) NOT NULL DEFAULT 'F' COMMENT 'F=notblock or T=block' ,
  UNIQUE (email)
, unique (mobile_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;