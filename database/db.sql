-- Create main database
CREATE DATABASE IF NOT EXISTS `st_db`;
-- Create shadow database for prisma
CREATE DATABASE IF NOT EXISTS `st_shadow_db`;

-- To GRANT ALL privileges to a user(st-mysql), allowing that user full control over a shadow database
GRANT ALL PRIVILEGES ON st_shadow_db.* TO 'jb-mysql'@'%';